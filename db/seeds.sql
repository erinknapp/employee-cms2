INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Salesperson', 45000, 1),
    ('Junior Engineer', 70000, 2),
    ('Manager', 80000, 2),
    ('Billing', 65000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
<<<<<<< HEAD
    ('Lzzy', 'Hale', 4, null),
    ('John', 'Johnson', 2, 3),
    ('Nina', 'Strauss', 3, null),
    ('Hank', 'Hill', 1, null);
  
=======
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', NULL, 1);
>>>>>>> da90c226ad72dd52aaf8a989b7b2a85c9d6ad08f
