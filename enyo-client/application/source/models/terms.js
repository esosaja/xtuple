/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  /**
    @class

    @extends XM.Document
  */
  XM.Terms = XM.Document.extend({
    /** @scope XM.Terms.prototype */

    recordType: 'XM.Terms',

    documentKey: 'code',

    enforceUpperKey: false,

    bindEvents: function () {
      XM.Document.prototype.bindEvents.apply(this, arguments);
      this.on("change:termsType", this.termsTypeDidChange);
    },

    termsTypeDidChange: function (model, termsType) {

      this.setReadOnly("cutOffDay", termsType === XM.Terms.DAYS);

      if (termsType === XM.Terms.DAYS) {

      } else if (termsType === XM.Terms.PROXIMO) {
        this.set("dueDays", 1);
        this.set("discountDays", 1);
      }
    },

    /**
      Enforce dueDate rules based on terms type. Otherwise validate per usual.
     */
    validate: function (attributes) {
      var dueDays = this.get("dueDays"),
        cutOffDate = this.get("cutOffDay");

      if (this.get("termsType") === XM.Terms.DAYS) {


      } else if (this.get("termsType") === XM.Terms.PROXIMO) {
        if (!_.isNumber(dueDays) || dueDays % 1 !== 0 || dueDays < 0 || dueDays > 31) {
          return XT.Error.clone('xt1004', { params: "due days" + dueDays }); // XXX TODO: better error
        }
        if (!_.isNumber(cutOffDate) || cutOffDate % 1 !== 0 || cutOffDate < 0 || cutOffDate > 31) {
          return XT.Error.clone('xt1004', { params: "cd" + cutOffDate }); // XXX TODO: better error
        }
      }

      return XM.Model.prototype.validate.apply(this, arguments);
    }

  });

  _.extend(XM.Terms, {

    DAYS: "D",

    PROXIMO: "P"

  });

  /**
    @class

    @extends XM.Collection
  */
  XM.TermsCollection = XM.Collection.extend({
    /** @scope XM.TermsCollection.prototype */

    model: XM.Terms

  });


}());
