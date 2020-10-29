begin;

truncate inventory cascade;

INSERT INTO inventory (id, item_name, site_id, ideal_amount, current_amount, critical_amount) VALUES
    ('5438', 'Toothpaste', '1', '50', '10', '30'),
    ('5439', 'Gloves', '1', '30', '5', '20'),
    ('5440', 'Body Wash', '2', '100', '20', '60'),
    ('5441', 'Toothbrush', '2', '120', '50', '80'),
    ('5442', 'Mouth wash', '3', '50', '10', '30')
;

commit;