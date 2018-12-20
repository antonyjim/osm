-- source D:\Projects\node\thq\schema.sql

DROP DATABASE IF EXISTS `thq`;
CREATE DATABASE `thq`;
USE `thq`;

-- +-----------------------------------------+
-- |Start Schema for site navigation         |
-- +-----------------------------------------+

-- Store navigation through the site
CREATE TABLE `navigation` (
    `navId` CHAR(36) NOT NULL, -- Unique id
    `navInnerText` VARCHAR(40) NOT NULL, -- Inner text of the <a> element
    `navHref` VARCHAR(120) NOT NULL, -- Href of the <a> element
    `navHeader` VARCHAR(40), -- Header for link
    `navMenu` VARCHAR(40), -- Root navigation menu
    `navActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`navId`)
);

-- Store permissions for users
 
-- Which view the user has of the site
-- E.G. Admin, Canadian, US
CREATE TABLE `siteViews` (
    `svKey` CHAR(36) NOT NULL, -- Nonsignificant key
    `svKeyword` VARCHAR(40) NOT NULL, -- Describe the view
    `svLink` CHAR(36) NOT NULL, -- Link to the links,

    PRIMARY KEY(`svKey`),

    FOREIGN KEY (`svLink`)
        REFERENCES `navigation`(`navId`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- +-----------------------------------------+
-- |Start Schema for nonsig data             |
-- +-----------------------------------------+

-- This data will not be tied to any one user account
CREATE TABLE `nsInfo` (
    `nsId` CHAR(36) NOT NULL,
    `nsTradeStyle` VARCHAR(100) NOT NULL,
    `nsNonsig` INT(9) NOT NULL UNIQUE,
    `nsAddr1` VARCHAR(40),
    `nsAddr2` VARCHAR(40),
    `nsCity` VARCHAR(40),
    `nsState` CHAR(2),
    `nsPostalCode` VARCHAR(10),
    `nsCountry` CHAR(2),
    `nsBrandKey` VARCHAR(4),
    `nsIsActive` BOOLEAN,
    `nsIsActiveTHQ` BOOLEAN,

    PRIMARY KEY (`nsId`)
);

-- +-----------------------------------------+
-- |Start Document Schema for Users          |
-- +-----------------------------------------+

-- Keep this table to a minimum, only to be used for login, password reset
CREATE TABLE `userRegistration` (
    `userId` CHAR(36) NOT NULL,
    `userName` VARCHAR(36) NOT NULL UNIQUE,
    `userPass` VARCHAR(70) NOT NULL,
    `userEmail` VARCHAR(90) NOT NULL,
    `userNonsig` CHAR(36) NOT NULL,
    `userIsLocked` BOOLEAN,
    `userIsAdmin` BOOLEAN, -- Is the user an admin
    `userIsSuperAdmin` BOOLEAN, -- Is the user a goodyear administrator
    `userAdministrator` CHAR(36), -- If not, list the administrator
    'userIsConfirmed' BOOLEAN, -- Test if user has confirmed their email
    'userConfirmationToken' VARCHAR(120), -- JWT Recieved in email

    PRIMARY KEY (`userId`),

    INDEX(`userName`),

    FOREIGN KEY (`userNonsig`)
        REFERENCES `nsInfo`(`nsId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY (`userAdministrator`)
        REFERENCES `userRegistration`(`userId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Store all of the info that is not used on every login here
CREATE TABLE `userInformation` (
    `userId` CHAR(36) NOT NULL,
    `userLastLogin` DATE,
    `userLastPasswordChange` DATE,
    `userFirstName` VARCHAR(30),
    `userLastName` VARCHAR(30),
    `userType` INT(1),
    `userPhone` VARCHAR(13), -- I know I'm being lazy here. Shut up
    /* At first I was going to store an address with each user, but the address should really be 
    pulled from the nonsig that the user is currently logged in as

    `userAddress` VARCHAR(90),
    `userCity` VARCHAR(90),
    `userState` CHAR(2),
    */
    `userView` CHAR(36),
    
    PRIMARY KEY (`userId`),

    FOREIGN KEY (`userId`)
        REFERENCES `userRegistration`(`userId`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (`userView`)
        REFERENCES `userRegistration`(`userId`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Store what links the user has access to here.
CREATE TABLE `userAccess` (
    -- This table will definitely be changed before ever seeing the light of day, but here is one way of doing things
    `accessKey` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `userId` CHAR(36) NOT NULL,
    `accessId` INT(6) NOT NULL,
    `accessHref` VARCHAR(100),
    `accessInnerText` VARCHAR(30)
);

-- +-----------------------------------------+
-- |Start Document Schema for Docs A,B,C etc |
-- +-----------------------------------------+
/*
    This table seems monolithic, and in some ways it is. But it is absolutely vital to store this
    information in it's own table with it's own columns that are seperate from any dynamic data.
*/
CREATE TABLE `finalDocumentsMast` (
    `docId` CHAR(36) NOT NULL, -- UUIDV4 unique identifier
    `docSubmitted` DATE, -- When the doc was submitted
    `docSourceNumber` INT(9) NOT NULL, -- Visible document number
    `docB50` INT(3), -- B50 Number for GBMS
    `docDealer` CHAR(36) NOT NULL, -- Dealer's nonsig
    `docShipDate` DATE NOT NULL,
    `docType` INT(2) NOT NULL, -- A,B,E, etc.
    `docAcct` INT(4), -- Allow null for doc B etc
    `docBillToNonsig` INT(9), -- Optional bill to nonsig
    `docShipToNonsig` INT(9),
    `docPRAcct` INT(2), -- P&R account GM, Chrysler, Ford, etc
    `docPRDlrNbr` INT(16), -- P&R Dealership Number
    `docVehType` CHAR(2),
    `docModifier` INT(1), -- Standard, return, correction
    `docAdjustment` BOOLEAN, -- Adjustment checkbox
    `docIsFleetHQ` BOOLEAN, -- FleetHQ check box
    `docIsMassMerchant` BOOLEAN, -- Doc F Modifier
    `dohMassMerchantNumber` INT,
    `docShipToId` CHAR(36), -- Reference an entry in the documentAddresses table
    `docShipToName` VARCHAR(60) NOT NULL,
    `docShipToAddr1` VARCHAR(90),
    `docShipToAddr2` VARCHAR(90),
    `docShipToCity` VARCHAR(90),
    `docShipToState` CHAR(2),
    `docShipToPostalCode` VARCHAR(10),
    `docBillToId` char(26), -- Reference an entry in the documentAddresses table
    `docBillToName` VARCHAR(60) NOT NULL, 
    `docBillToAddr1` VARCHAR(90),
    `docBillToAddr2` VARCHAR(90),
    `docBillToCity` VARCHAR(90),
    `docBillToState` CHAR(2),
    `docBillToPostalCode` VARCHAR(10),
    `docFleetHQCall` INT(10),
    `docCorrectionIndicator` BOOLEAN,
    `docCorrectionReference` CHAR(36),
    `docCorrectionReason` VARCHAR(120),
    `docGeoCode` INT(9),
    `docIsOutOfState` BOOLEAN,
    `docInvoiceNumber` INT(10),
    `docInvoiceMicroNumber` INT(6),
    `docInvoiceDate` DATE,
    `docInvoiceLastPrinted` DATE,
    `docInvoiceIsCreditDebit` BOOLEAN,
    `docInvoiceAmount` INT,

    PRIMARY KEY(`docId`),
    INDEX(`docDealer`)
);

CREATE TABLE `finalDocumentsReqs` (
    `docReq` INT AUTO_INCREMENT NOT NULL,
    `docId` CHAR(36) NOT NULL,
    `docReqKeyWord` CHAR(3), -- Not a foreign key to allow submitted documents to still reference old requirements
    `docReqShortDesc` VARCHAR(40),
    `docReqValue` VARCHAR(40),

    PRIMARY KEY(`docReq`),
    INDEX(`docId`),

    FOREIGN KEY (`docId`)
        REFERENCES `finalDocumentsMast`(`docId`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Store documents on hold and pending documents in documentsOnHold
-- Dynamically pull shipto/billto from docProducts table
CREATE TABLE `documentsOnHold` (
    `dohId` CHAR(36) NOT NULL, -- UUIDV4 unique identifier
    `dohLastScreen` INT(1), -- Last screen the doc was opened to
    `dohLastOpened` DATE, -- Last time the doc was opened
    `dohSourceNumber` INT(9) NOT NULL, -- Visible document number
    `dohDealer` INT(9) NOT NULL, -- Dealer's nonsig
    `dohShipDate` DATE NOT NULL,
    `dohType` CHAR(1) NOT NULL, -- A,B,E, etc.
    `dohAcct` INT(4), -- Allow null for doc B etc
    `dohBillToNonsig` INT(9), -- Optional bill to nonsig
    `dohShipToNonsig` INT(9),
    `dohPRAcct` INT(2), -- P&R account GM, Chrysler, Ford, etc
    `dohPRDlrNbr` INT(16), -- P&R Dealership Number
    `dohVehType` CHAR(2), -- LT, AU, TL, ST
    `dohModifier` INT(1), -- Standard, return, correction
    `dohGovModifier` CHAR(1), -- Exempt, Federal, State/Local
    `dohAdjustment` BOOLEAN, -- Adjustment checkbox
    `dohFleetHQ` BOOLEAN, -- FleetHQ check box
    `dohMassMerchant` BOOLEAN, -- Doc F Modifier
    `dohMassMerchantNumber` INT,
    `dohShipToId` CHAR(36), -- Reference an entry in the documentAddresses table
    `dohBillToId` CHAR(36), -- Reference an entry in the documentAddresses table
    `dohFleetHQCall` INT(10),
    `dohCorrectionIndicator` BOOLEAN,
    `dohCorrectionReference` CHAR(36),
    `dohCorrectionReason` VARCHAR(120),
    `dohGeoCode` INT(9),
    `dohIsOutOfState` BOOLEAN,

    PRIMARY KEY(`dohId`),
    INDEX(`dohDealer`),

    FOREIGN KEY (`dohCorrectionReference`)
        REFERENCES `finalDocumentsMast`(`docId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

CREATE TABLE `docProducts` (
    `dpKey` INT NOT NULL AUTO_INCREMENT,
    `dpDocId` CHAR(36) NOT NULL, -- Reference the document that this is connected to
    `dpCode` INT(9) NOT NULL,
    `dpDescription` VARCHAR(80),
    `dpPartsPrice` DECIMAL(7,2),
    `dpQuantity` INT(4),
    `dpIsRetread` BOOLEAN,
    `dpCustomerOwned` BOOLEAN, -- For retread casings only

    PRIMARY KEY(`dpKey`),

    FOREIGN KEY (`dpDocId`)
        REFERENCES `documentsOnHold`(`dohId`)
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);

-- Store billTo/shipTo addresses for dealers
-- Only allow dealers to access their own addresses
-- Modifying these values will also affect any documents on hold
CREATE TABLE `addrBook` (
   -- `addrId` CHAR(36) NOT NULL, -- Unique UUIDV4 identifying the address
    `abNonsig` INT NOT NULL AUTO_INCREMENT, -- Simple number to search by
    `abOwner` INT(9) NOT NULL, -- The creating dealer's nonsig
    `abName` VARCHAR(60) NOT NULL, -- Searchable name
    `abAcct` INT(4), -- Tie addr into a certain account, optionally
    `abAddr1` VARCHAR(90),
    `abAddr2` VARCHAR(90),
    `abCity` VARCHAR(90),
    `abState` CHAR(2),
    `abPostalCode` VARCHAR(10),

    PRIMARY KEY(`abNonsig`)
);

-- +---------------------------------------------+
-- |Start Document Schema for Gov/National ACCTS |
-- +---------------------------------------------+

-- Store data about the national account
CREATE TABLE `nationalAccount` (
    `naId` CHAR(36) NOT NULL,
    `naNbr` VARCHAR(7),
    `naNonsig` VARCHAR(7),
    `naName` VARCHAR(40),
    `naAddr1` VARCHAR(40),
    `naAddr2` VARCHAR(40),
    `naPostalCode` VARCHAR(10),
    `naCity` VARCHAR(40),
    `naState` CHAR(2),
    `naCountry` CHAR(2),
    `naIsOnCreditHold` BOOLEAN,
    `naIsActive` BOOLEAN,

    PRIMARY KEY (`naId`),

    INDEX(`naNbr`, `naNonsig`)
);

CREATE TABLE `shipToNonsig` (
    `stnId` CHAR(36) NOT NULL,
    `stnAcct` CHAR(36),
    `stnNonsig` VARCHAR(7),
    `stnName` VARCHAR(40),
    `stnAddr1` VARCHAR(40),
    `stnAddr2` VARCHAR(40),
    `stnPostalCode` VARCHAR(10),
    `stnCity` VARCHAR(40),
    `stnState` CHAR(2),
    `stnCountry` CHAR(2),

    PRIMARY KEY (`stnId`),

    FOREIGN KEY (`stnAcct`)
        REFERENCES `nationalAccount`(`naId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Store the data for the various types of requirements,
-- E.g. PO, Unit Number, Location Code
CREATE TABLE `requirementElements` (
    `reKeyWord` CHAR(3), -- ShortHand, E.g. Location code could be shortened to EO3 / Whatever
    `reShortDesc` VARCHAR(40), -- The label that will be used in the <label> element
    `reId` VARCHAR(20), -- The id/name that the <input> element will be assigned
    `reHasHelp` BOOLEAN, -- Toggle the requirement mask for this requirement
    `reHelpURL` VARCHAR(15), -- Eventually, reference an inline help article by clicking on ?

    PRIMARY KEY (`reKeyWord`)
);

CREATE TABLE `requirementAcceptableValues` (
    `ravId` CHAR(36) NOT NULL, -- Unique indentifier for each value in the mask
    `ravMask` VARCHAR(40), -- NXAB mask
    `ravValue` VARCHAR(40) NOT NULL, -- Actual value
    `ravKeyWord` CHAR(3) NOT NULL, -- Keyword to match up with the requirementElements
    `ravAcct` CHAR(36) NOT NULL, -- NA/GA associated with the requirement
    `ravNonsig` CHAR(36), -- Optional nonsig

    PRIMARY KEY (`ravId`),

    FOREIGN KEY (`ravKeyWord`)
        REFERENCES `requirementElements`(`reKeyWord`)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (`ravAcct`)
        REFERENCES `nationalAccount`(`naId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY (`ravNonsig`)
        REFERENCES `shipToNonsig`(`stnId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

-- Store the attributes for the requirements
-- Since these are <input> attributes, I don't expect any huge chunks of data
-- to be stored here. The largest would probably be the placeholder attribute. 
CREATE TABLE `requirementAttributes` (
    `raKey` INT(7) NOT NULL AUTO_INCREMENT, -- Nonsignificant, unique key
    `raKeyWord` CHAR(3), -- Link to requirements.keyWord
    `raAttributeName` VARCHAR(20), -- HTML attribute name
    `raAttributeValue` VARCHAR(100), -- HTML attribute value

    PRIMARY KEY (`raKey`),
    
    FOREIGN KEY (`raKeyword`) -- Use the keyword to find the attributes for that input
        REFERENCES `requirementElements`(`reKeyWord`)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Store any MDSE that is excluded from a national account
CREATE TABLE `disallowedMerchandise` (
    `dmId` INT NOT NULL AUTO_INCREMENT,
    `dmAcct` CHAR(36),
    `dmShipToNonsig` CHAR(36),
    `dmDept` INT(3),
    `dmCode` INT(9),
    `dmRangeFrom` INT(9),
    `dmRangeTo` INT(9),

    PRIMARY KEY (`dmId`),

    FOREIGN KEY (`dmAcct`)
        REFERENCES `nationalAccount`(`naId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    FOREIGN KEY (`dmShipToNonsig`)
        REFERENCES `shipToNonsig`(`stnId`)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);

