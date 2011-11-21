// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework
// Copyright: ©2011 OpenMFG LLC, d/b/a xTuple
// ==========================================================================
/*globals XT */
/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/

XM.Characteristic = XM.Record.extend(
/** @scope XM.Characteristic.prototype */ {

  className: 'XM.Characteristic',

  createPrivilege:  'MaintainCharacteristics',
  readPrivilege:    'ViewCharacteristics',
  updatePrivilege:  'MaintainCharacteristics',
  deletePrivilege:  'MaintainCharacteristics',

  /**
  @type String
  */
  name: SC.Record.attr(String, { isRequired: YES }),
  
  /**
  @type Number
  */
  characteristicType: SC.Record.attr(Number),
  
  /**
  @type Number
  */
  order: SC.Record.attr(Number),
  
  /**
  @type String
  */
  notes: SC.Record.attr(String),
  
  /**
  @type String
  */
  mask: SC.Record.attr(String),
  
  /**
  @type String
  */
  validator: SC.Record.attr(String),
  
  /**
  @type XM.CharaceteristicRoleAssignment
  */
  roles: SC.Record.toMany('XM.CharacteristicRoleAssignment'),

}) ;

/**
  @static
  @constant
  @type Number
  @default 0
*/
XM.Characteristic.TEXT = 0;

/**
  @static
  @constant
  @type Number
  @default 1
*/
XM.Characteristic.LIST = 1;

/**
  @static
  @constant
  @type Number
  @default 2
*/
XM.Characteristic.DATE = 2;
