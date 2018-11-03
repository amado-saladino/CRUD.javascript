# Heroes sample using pure Javascript
This demo simulates the same behavior as heroes example presented by Angular, click [Angular example](https://angular.io/tutorial/toh-pt6) to browse this done by Angular

## Pre-requisistes
Before you start this application you should install **PHP** with **Apache server**.

## Application data in MySQL DB
You should add this data into database; in this demo *test* DB

Run this sql script in your MySQL console or phpMyAdmin:

```sh
CREATE TABLE IF NOT EXISTS `heroes` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(25) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;


INSERT INTO `heroes` (`ID`, `Name`) VALUES
(1, 'Rubber Man'),
(2, 'Bombasto'),
(3, 'Mr. Nice'),
(5, 'Celeritas'),
(6, 'Magma'),
(10, 'Blombo'),
(16, 'Dynama'),
(17, 'Mr. Wonder'),
(18, 'Narco'),
(19, 'Super Man'),
(22, 'Bat Man'),
(23, 'Bomber Man');
```

## Folders and files:
Create a folder with any name you want e.g. *site* under **www** folder inside **wamp** folder

## Run the app!
Open your browser and navigate to
```
http://localhost:8000/site/CRUD.html
```

Good luck