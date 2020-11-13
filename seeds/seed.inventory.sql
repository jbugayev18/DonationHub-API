begin;

truncate inventory cascade;

INSERT INTO inventory (id, item_name, site_id, ideal_amount, current_amount, critical_amount) VALUES
    ('1', 'Toothpaste', 1, '50', '10', '30'),
    ('2', 'Gloves', 1, '30', '5', '20'),
    ('3', 'Body Wash', 2, '100', '20', '60'),
    ('4', 'Toothbrush', 2, '120', '50', '80'),
    ('5', 'Mouth wash', 3, '50', '10', '30')
;

commit;