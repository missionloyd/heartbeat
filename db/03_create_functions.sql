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

    -- Color-blind friendly & divergent color scheme:
    -- https://colorbrewer2.org/#type=diverging&scheme=RdBu&n=5

    -- HIGH (RGB) : (202 0 32) -> RED
    -- MID (RGB) : (204 204 204) -> GREY
    -- LOW (RGB) : (5 113 176) -> BLUE

    IF score = 0 THEN
        r := 204;
        g := 204;
        b := 204;
    ELSE
        normal_score := 1 / (1 + EXP(-score));

        r := ROUND(normal_score * 197)::INTEGER + 5;
        g := ROUND(113 - normal_score * 113)::INTEGER;
        b := ROUND(144 - normal_score * 144)::INTEGER + 32;
    END IF;

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