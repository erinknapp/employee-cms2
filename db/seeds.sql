INSERT INTO department (name)
VALUES

-- Department 1, 2, 3
    ('Sales'),      
    ('Engineering'),
    ('Finance');

INSERT INTO role (title, salary, department_id)
VALUES
-- Role 1, 2, 3, 4
    ('Salesperson', 45000, 1),
    ('Junior Engineer', 70000, 2),
    ('Manager', 80000, 2),
    ('Billing', 65000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, NULL),
  ('Charles', 'LeRoi', 2, 3,
  ('Katherine', 'Mansfield', 2, 3),
  ('Dora', 'Carrington', 3, 7),
  ('Edward', 'Bellamy', 3, NULL),
  ('Montague', 'Summers', 3, 7),
  ('Octavia', 'Butler', 3, 10),
  ('Unica', 'Zurn', 1, NULL);
  
