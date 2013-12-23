/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true*/
/*global XT:true, XV:true, enyo:true*/

(function () {

  XT.extensions.billing.initListRelations = function () {

    enyo.kind({
      name: "XV.ReceivableTaxListRelations",
      kind: "XV.ListRelations",
      parentKey: "receivable",
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short", fit: true, components: [
              {kind: "XV.ListAttr", attr: "taxCode.code", classes: "bold"}
            ]},
            {kind: "XV.ListColumn", components: [
              {kind: "XV.ListAttr", attr: "taxAmount", classes: "bold"}
            ]}
          ]}
        ]}
      ]
    });

    enyo.kind({
      name: "XV.ReceivableApplicationListRelations",
      kind: "XV.ListRelations",
      parentKey: "receivable",
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short", fit: true, components: [
              {kind: "XV.ListAttr", attr: "documentNumber", classes: "bold"}
            ]},
            {kind: "XV.ListColumn", components: [
              {kind: "XV.ListAttr", attr: "applicationDate"}
            ]}
          ]}
        ]}
      ]
    });

    /**
     * @class XV.CashReceiptLineList
     * @extends XV.ListRelations
     * @see XV.CashReceiptApplicationsList
     */
    enyo.kind({
      name: 'XV.CashReceiptLineList',
      kind: 'XV.ListRelations',
      parentKey: 'cashReceipt',
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short", fit: true, components: [
              {kind: "XV.ListAttr", attr: "cashReceiptReceivable.receivable.documentNumber", classes: "bold"}
            ]},
            {kind: "XV.ListColumn", components: [
              {kind: "XV.ListAttr", attr: "amount", formatter: 'formatMoney'}
            ]}
          ]}
        ]}
      ],
      valueChanged: function () {
        this.inherited(arguments);
        this.warn(this.value);
        this.warn(this.list);
      },
      formatMoney: function (value, view, model) {
        var currency = model ? model.getValue('cashReceipt.currency') : false,
          scale = XT.locale.moneyScale;
        return currency ? currency.format(value, scale) : "";
      }
    });

    /**
     * @class XV.CashReceiptAllocationList
     * @extends XV.ListRelations
     * @see XV.CashReceiptAllocationList
     */
    enyo.kind({
      name: 'XV.CashReceiptAllocationList',
      kind: 'XV.ListRelations',
      parentKey: 'target',
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short", fit: true, components: [
              {kind: "XV.ListAttr", attr: "receivable.documentNumber", classes: "bold"}
            ]},
            {kind: "XV.ListColumn", components: [
              {kind: "XV.ListAttr", attr: "amount", formatter: 'formatMoney'}
            ]}
          ]}
        ]}
      ],
      valueChanged: function () {
        this.inherited(arguments);
        this.warn(this.value);
        this.warn(this.list);
      },
      formatMoney: function (value, view, model) {
        var currency = model ? model.getValue('currency') : false,
          scale = XT.locale.moneyScale;
        return currency ? currency.format(value, scale) : "";
      }
    });
  };

  XV.registerModelList('XM.CashReceiptAllocationListItem', 'XV.CashReceiptAllocationList');
  XV.registerModelList('XM.CashReceiptLineListItem', 'XV.CashReceiptLineList');
}());
