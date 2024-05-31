CREATE FUNCTION public.generate_hex_using_score(score NUMERIC)
    RETURNS TEXT
    LANGUAGE plpgsql
    AS $$
DECLARE
    normal_score NUMERIC;
    r INTEGER;
    g INTEGER;
    b INTEGER;
    r_hex TEXT;
    g_hex TEXT;
    b_hex TEXT;
    hex_color TEXT;
BEGIN

    IF score = 0 THEN
        normal_score := 0.5 - 0.001;
    ELSE
        normal_score := 1 / (1 + EXP(-score));
    END IF;

    r := ROUND(normal_score * 255)::INTEGER;
    g := ROUND(255 - normal_score * 255)::INTEGER;
    b := 0;

    r_hex := TO_HEX(r)::TEXT;
    g_hex := TO_HEX(g)::TEXT;
    b_hex := TO_HEX(b)::TEXT;

    -- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    -- Pad the hex strings with a '0' to ensure a length of 2 always:
    -- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    IF LENGTH(r_hex) = 1 THEN
        r_hex := CONCAT('0', r_hex);
    END IF;

    IF LENGTH(g_hex) = 1 THEN
        g_hex := CONCAT('0', g_hex);
    END IF;

    IF LENGTH(b_hex) = 1 THEN
        b_hex := CONCAT('0', b_hex);
    END IF;

    -- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    hex_color := CONCAT(
        '#',
        r_hex,
        g_hex,
        b_hex
    );

    RETURN hex_color;

END;
$$;