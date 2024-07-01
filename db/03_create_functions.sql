CREATE OR REPLACE FUNCTION generate_hex_using_score(score DOUBLE PRECISION)
RETURNS TEXT AS $$
DECLARE
    norm_score DOUBLE PRECISION;
    interpolated_color INTEGER[];
    low_color CONSTANT INTEGER[] := ARRAY[5, 113, 176];     -- RGB for #0571B0
    mid_color CONSTANT INTEGER[] := ARRAY[204, 204, 204];   -- RGB for #CCCCCC
    high_color CONSTANT INTEGER[] := ARRAY[202, 0, 32];     -- RGB for #CA0020
BEGIN
    -- Normalize the score using a sigmoid function
    norm_score := 2 / (1 + exp(-score)) - 1;

    -- Determine the color by interpolating based on the normalized score
    IF norm_score < 0 THEN
        interpolated_color := ARRAY[
            (low_color[1] + ((mid_color[1] - low_color[1]) * (norm_score + 1)))::INTEGER,
            (low_color[2] + ((mid_color[2] - low_color[2]) * (norm_score + 1)))::INTEGER,
            (low_color[3] + ((mid_color[3] - low_color[3]) * (norm_score + 1)))::INTEGER
        ];
    ELSIF norm_score > 0 THEN
        interpolated_color := ARRAY[
            (mid_color[1] + ((high_color[1] - mid_color[1]) * norm_score))::INTEGER,
            (mid_color[2] + ((high_color[2] - mid_color[2]) * norm_score))::INTEGER,
            (mid_color[3] + ((high_color[3] - mid_color[3]) * norm_score))::INTEGER
        ];
    ELSE
        interpolated_color := mid_color;
    END IF;

    -- Convert the RGB values to a hexadecimal color string
    RETURN '#' || 
           lpad(to_hex(interpolated_color[1]), 2, '0') ||
           lpad(to_hex(interpolated_color[2]), 2, '0') ||
           lpad(to_hex(interpolated_color[3]), 2, '0');
END;
$$ LANGUAGE plpgsql;

-- 
-- -------------------------------------------------------------------
-- 

CREATE OR REPLACE FUNCTION public.generate_tree_json(id_value INTEGER)
RETURNS JSONB[]
LANGUAGE plpgsql AS
$$
DECLARE
   parent_lft INTEGER;
   parent_rght INTEGER;
BEGIN

    -------------------------------------------------------
    -- Recursively generate a tree JSON from a PARENT ID --
    -------------------------------------------------------

    RETURN (
        COALESCE (
            (
                SELECT
                    ARRAY_AGG(
                        JSON_BUILD_OBJECT(
                            'id', tree_view.child_id,
                            'name', tree_view.child_name,
                            'children', generate_tree_json(tree_view.child_id)
                        )
                    )
                FROM
                    tree_view
                WHERE
                    tree_view.parent_id = id_value
            ),
            ARRAY[]::JSON[]
        )
    );

END;
$$;