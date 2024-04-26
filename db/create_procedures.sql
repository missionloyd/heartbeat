--
-- TOC entry 239 (class 1255 OID 74323)
-- Name: insert_child_assets(text[]); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE OR REPLACE PROCEDURE public.insert_child_assets(IN assets text[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    isActive BOOLEAN;
    asset_name TEXT;
    asset_short_name TEXT;
    parent_name TEXT;
    parent_tree_id INTEGER;
    parent_left INTEGER;
BEGIN

    FOR i IN 1..ARRAY_LENGTH(assets, 1)
    LOOP

      isActive := assets[i][1];
      asset_name := assets[i][2];
      asset_short_name := assets[i][3];
      parent_name := assets[i][4];

      SELECT tree_id
      INTO parent_tree_id
      FROM asset WHERE asset.name = parent_name;

      SELECT lft
      INTO parent_left
      FROM asset WHERE asset.name = parent_name;

      UPDATE asset
      SET rght = rght + 2
      WHERE rght > parent_left
      AND tree_id = parent_tree_id;

      UPDATE asset
      SET lft = lft + 2
      WHERE lft > parent_left
      AND tree_id = parent_tree_id;

      INSERT INTO asset
      (name, short_name, lft, rght, active, tree_id)
      VALUES
      (asset_name, asset_short_name, parent_left+1, parent_left+2, isActive, parent_tree_id);

    END LOOP;
END;
$$;


--
-- TOC entry 238 (class 1255 OID 74325)
-- Name: insert_into_measurement(); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE OR REPLACE PROCEDURE public.insert_into_measurement()
    LANGUAGE plpgsql
    AS $$
BEGIN

    INSERT INTO measurement
    (asset_id, commodity_id, ts, value)
    SELECT asset_id, commodity_id, ts, value FROM measurement_copy
    WHERE asset_id IS NOT NULL;

END;
$$;


--
-- TOC entry 237 (class 1255 OID 74322)
-- Name: insert_parent_assets(text[]); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE OR REPLACE PROCEDURE public.insert_parent_assets(IN assets text[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    isActive BOOLEAN;
    asset_name TEXT;
    asset_short_name TEXT;
    left_value INTEGER;
    right_value INTEGER;
BEGIN

    FOR i IN 1..ARRAY_LENGTH(assets, 1)
    LOOP

        isActive := 'true';
        asset_name := assets[i];
        asset_short_name := assets[i];
        left_value := 1;
        right_value := 2;

        INSERT INTO asset(name, short_name, lft, rght, active)
        VALUES
        (asset_name, asset_short_name, left_value, right_value, isActive);

    END LOOP;
END;
$$;


--
-- TOC entry 236 (class 1255 OID 74324)
-- Name: update_measurement_foreign_keys(); Type: PROCEDURE; Schema: public; Owner: -
--

CREATE OR REPLACE PROCEDURE public.update_measurement_foreign_keys()
    LANGUAGE plpgsql
    AS $$
BEGIN

    UPDATE measurement_copy
    SET asset_id = (SELECT id FROM asset WHERE name = bldgname);

    UPDATE measurement_copy
    SET commodity_id = (SELECT id FROM commodity WHERE type = commodity_type);

END;
$$;