/**
Full Address editable input.
Internally value stored as {name: "Address #1", address: "21st Street", city: "Moscow", state: "Lenina", postcode: "EN", phone: "123"}

@class address
@extends abstractinput
@final
@example
<a href="#" id="address" data-type="full-address" data-pk="1">awesome</a>
<script>
$(function(){
    $('#address').editable({
        url: '/post',
        title: 'Enter your full address',
        value: {
            name: "Address #1",
            address: "21st Street",
            city: "Moscow",
            state: "Lenina",
            postcode: "EN",
            phone: "123"
        }
    });
});
</script>
**/
(function ($) {
    "use strict";

    var FullAddress = function (options) {
		var $scope = $(options.scope);
        this.init('full-address', options, FullAddress.defaults);
		if( $scope.data( 'value' ) )	this.value2html( $scope.data( 'value' ), $scope.get(0) );
    };

    //inherit from Abstract input
    $.fn.editableutils.inherit(FullAddress, $.fn.editabletypes.abstractinput);

    $.extend(FullAddress.prototype, {
        /**
        Renders input from tpl

        @method render()
        **/
        render: function() {
           this.$input = this.$tpl.find('input');
        },

        /**
        Default method to show value in element. Can be overwritten by display option.

        @method value2html(value, element)
        **/
        value2html: function(value, element) {
            if(!value) {
                $(element).empty();
                return;
            }
			var $addressLines = $('<div>').addClass( 'address-lines' );
			if( value.name )	$addressLines.append( '<span class="address-line address-name">' + value.name + '</span>' );
			if( value.address )	$addressLines.append( '<span class="address-line address-address">' + value.address + '</span>' );
			if( value.city )	$addressLines.append( '<span class="address-line address-city">' + value.city + '</span>' );
			if( value.postcode )	$addressLines.append( '<span class="address-line address-postcode">' + value.postcode + '</span>' );
			if( value.phone )	$addressLines.append( '<span class="address-line address-phone">Tel: ' + value.phone + '</span>' );
            $(element).html( $addressLines );
        },

        /**
        Gets value from element's html

        @method html2value(html)
        **/
        html2value: function(html) {
          /*
            you may write parsing method to get value by element's html
            e.g. "Moscow, st. Lenina, bld. 15" => {city: "Moscow", street: "Lenina", building: "15"}
            but for complex structures it's not recommended.
            Better set value directly via javascript, e.g.
            editable({
                value: {
                    city: "Moscow",
                    street: "Lenina",
                    building: "15"
                }
            });
          */
          return null;
        },

       /**
        Converts value to string.
        It is used in internal comparing (not for sending to server).

        @method value2str(value)
       **/
       value2str: function(value) {
           var str = '';
           if(value) {
               for(var k in value) {
                   str = str + k + ':' + value[k] + ';';
               }
           }
           return str;
       },

       /*
        Converts string to value. Used for reading value from 'data-value' attribute.

        @method str2value(str)
       */
       str2value: function(str) {
           /*
           this is mainly for parsing value defined in data-value attribute.
           If you will always set value by javascript, no need to overwrite it
           */
           return str;
       },

       /**
        Sets value of input.

        @method value2input(value)
        @param {mixed} value
       **/
       value2input: function(value) {
           if(!value) {
             return;
           }
           this.$input.filter('[name="name"]').val(value.name);
           this.$input.filter('[name="address"]').val(value.address);
           this.$input.filter('[name="city"]').val(value.city);
           this.$input.filter('[name="postcode"]').val(value.postcode);
           this.$input.filter('[name="phone"]').val(value.phone);
       },

       /**
        Returns value of input.

        @method input2value()
       **/
       input2value: function() {
           return {
              name: this.$input.filter('[name="name"]').val(),
              address: this.$input.filter('[name="address"]').val(),
              city: this.$input.filter('[name="city"]').val(),
              postcode: this.$input.filter('[name="postcode"]').val(),
              phone: this.$input.filter('[name="phone"]').val()
           };
       },

        /**
        Activates input: sets focus on the first field.

        @method activate()
       **/
       activate: function() {
            this.$input.filter('[name="name"]').focus();
       },

       /**
        Attaches handler to submit form in case of 'showbuttons=false' mode

        @method autosubmit()
       **/
       autosubmit: function() {
           this.$input.keydown(function (e) {
                if (e.which === 13) {
                    $(this).closest('form').submit();
                }
           });
       }
    });

    FullAddress.defaults = $.extend({}, $.fn.editabletypes.abstractinput.defaults, {
		tpl: [
			'<div class="editable-address editable-address-name"><label><span>Name: </span><input type="text" name="name" class="input-small"></label></div>',
			'<div class="editable-address editable-address-address"><label><span>Address: </span><input type="text" name="address" class="input-small"></label></div>',
			'<div class="editable-address editable-address-city"><label><span>City: </span><input type="text" name="city" class="input-mini"></label></div>',
			'<div class="editable-address editable-address-postcode"><label><span>Postcode: </span><input type="text" name="postcode" class="input-mini"></label></div>',
			'<div class="editable-address editable-address-phone"><label><span>Phone: </span><input type="text" name="phone" class="input-mini"></label></div>'
		].join( "\n" ),
        inputclass: ''
    });

    $.fn.editabletypes['full-address'] = FullAddress;

}(window.jQuery));
