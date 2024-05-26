
CREATE PROCEDURE public.add_tree_under_root(IN root_name text, IN tree_parent_name text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    root_right INTEGER;
    root_tree_id INTEGER;
    tree_parent_right INTEGER;
    tree_parent_tree_id INTEGER;
BEGIN

    SELECT rght, tree_id
    INTO root_right, root_tree_id
    FROM asset
    WHERE name = root_name;

    -------------------------------------------

    SELECT tree_id
    INTO tree_parent_tree_id
    FROM asset
    WHERE name = tree_parent_name;

    -------------------------------------------

    UPDATE asset
    SET lft = lft + (root_right - 1)
    WHERE tree_id = tree_parent_tree_id;

    UPDATE asset
    SET rght = rght + (root_right - 1)
    WHERE tree_id = tree_parent_tree_id;

    UPDATE asset
    SET tree_id = root_tree_id
    WHERE tree_id = tree_parent_tree_id;

    -------------------------------------------

    SELECT rght
    INTO tree_parent_right
    FROM asset
    WHERE name = tree_parent_name;

    UPDATE asset
    SET rght = tree_parent_right + 1
    WHERE name = root_name;

END;
$$;

-- 
-- ----------------------------------------------------------
-- 

CREATE PROCEDURE public.insert_child_assets(IN assets text[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    isActive BOOLEAN;
    asset_name TEXT;
    parent_name TEXT;
    parent_tree_id INTEGER;
    parent_left INTEGER;
BEGIN

    FOR i IN 1..ARRAY_LENGTH(assets, 1)
    LOOP

      isActive := assets[i][1]::BOOLEAN;
      asset_name := assets[i][2];
      parent_name := assets[i][3];

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
      (name, lft, rght, active, tree_id)
      VALUES
      (asset_name, parent_left+1, parent_left+2, isActive, parent_tree_id);

    END LOOP;
END;
$$;

-- 
-- ----------------------------------------------------------
-- 

CREATE PROCEDURE public.insert_into_measurement()
    LANGUAGE plpgsql
    AS $$
BEGIN

    INSERT INTO measurement
    (asset_id, commodity_id, ts, value)
    SELECT asset_id, commodity_id, ts, value FROM measurement_copy;

END;
$$;

-- 
-- ----------------------------------------------------------
-- 

CREATE PROCEDURE public.insert_parent_assets(IN assets text[])
    LANGUAGE plpgsql
    AS $$
DECLARE
    isActive BOOLEAN;
    asset_name TEXT;
    left_value INTEGER;
    right_value INTEGER;
BEGIN

    FOR i IN 1..ARRAY_LENGTH(assets, 1)
    LOOP

        isActive := 'true';
        asset_name := assets[i];
        left_value := 1;
        right_value := 2;

        INSERT INTO asset(name, lft, rght, active)
        VALUES
        (asset_name, left_value, right_value, isActive);

    END LOOP;
END;
$$;

-- 
-- ----------------------------------------------------------
-- 

CREATE PROCEDURE public.update_measurement_foreign_keys()
    LANGUAGE plpgsql
    AS $$
DECLARE
    foreign_assets TEXT[][3];
BEGIN

    UPDATE measurement_copy
    SET commodity_id = (SELECT id FROM commodity WHERE type = commodity_type);

    UPDATE measurement_copy
    SET asset_id = (SELECT id FROM asset WHERE name = bldgname);

    foreign_assets := ARRAY(
        SELECT DISTINCT ARRAY['1', bldgname, campus]
        FROM measurement_copy
        WHERE asset_id IS NULL
    );

    CALL insert_child_assets(foreign_assets);

    UPDATE measurement_copy
    SET asset_id = (SELECT id FROM asset WHERE name = bldgname);

END;
$$;