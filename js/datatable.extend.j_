( function( $ )
{
	//From ColReorder (SpryMedia Ltd (www.sprymedia.co.uk))
    function getSettingsObjFromTable(dt) {
        var oDTSettings;
        if ($.fn.dataTable.Api) {
            oDTSettings = new $.fn.dataTable.Api(dt).settings()[0];
        } else if (dt.fnSettings) {// 1.9 compatibility
            // DataTables object, convert to the settings object
            oDTSettings = dt.fnSettings();
        } else if (typeof dt === 'string') {// jQuery selector
            if ($.fn.dataTable.fnIsDataTable($(dt)[0])) {
                oDTSettings = $(dt).eq(0).dataTable().fnSettings();
            }
        } else if (dt.nodeName && dt.nodeName.toLowerCase() === 'table') {
            // Table node
            if ($.fn.dataTable.fnIsDataTable(dt.nodeName)) {
                oDTSettings = $(dt.nodeName).dataTable().fnSettings();
            }
        } else if (dt instanceof jQuery) {
            // jQuery object
            if ($.fn.dataTable.fnIsDataTable(dt[0])) {
                oDTSettings = dt.eq(0).dataTable().fnSettings();
            }
        } else {
            // DataTables settings object
            oDTSettings = dt;
        }
        return oDTSettings;
    }

    //  Check
    if( $.fn.dataTable )
    {
        //  Extend Search to Support Advanced Filtering
        $.fn.dataTable.ext.search.push( function( settings, data, dataIndex )
        {
            //  Table
            var $table = $( settings.nTable );

            //  DataTable
            var dTable = $table.DataTable();

            //  Search Settings
            var sSettings = $table.data( 'dateRangeSearch' );

            //  Check
            if( sSettings && sSettings.hasOwnProperty( 'start' ) )
            {
                //  Parse Date
                var colDate = moment( data[sSettings.column - 1], sSettings.format );

                //  In Range
                var inRange = ( ( colDate.isSame( sSettings.start ) || colDate.isAfter( sSettings.start ) ) && ( colDate.isSame( sSettings.end ) || colDate.isBefore( sSettings.end ) ) );

                //  Return
                return inRange;
            }

            //  Return
            return true;
        } );

        //  Custom Box
        $.fn.dataTableExt.oPagination.custom_box = {

            //  On Init
            "fnInit": function (oSettings, nPaging, fnCallbackDraw)
            {
                //  Show Rows El
                var $gotoEl = $( '<span class="paging-goto">Go to:</span>' );

                //  Paging Stat El
                var $pagingStatEl = $( '<span class="paging-stat" />' );

                //  Input El
                var $inputEl = $( '<input class="form-control paging-input" value="1" />' );

                //  Left Nav El
                var $leftNavEl = $( '<button class="btn btn-default paging-nav nav-left">&laquo;</button>' );

                //  Right Nav El
                var $rightNavEl = $( '<button class="btn btn-default paging-nav nav-right">&raquo;</button>' );

                //  Button Group
                var $buttonGroup = $( '<div class="btn-group paging-nav-group"></div>' );

                //  Show Rows El
                var $showRowsEl = $( '<span class="paging-rows">Show rows:</span>' );

                //  Select El
                var $selectEl = $( '<select class="paging-rows-count form-control" data-selectbox="true"></select>' );

                //  Populate the Options
                $selectEl.append( '<option value="10">10</option>' );
                $selectEl.append( '<option value="25">25</option>' );
                $selectEl.append( '<option value="50">50</option>' );
                $selectEl.append( '<option value="100">100</option>' );

                //  Set Selected
                $selectEl.find( 'option' ).filter( function()
                {
                    //  Return
                    return ( $(this).val() == oSettings._iDisplayLength );
                } ).prop( 'selected', true );

                //  Append Elements
                $buttonGroup.append( $leftNavEl );
                $buttonGroup.append( $rightNavEl );
                $( nPaging ).append( $showRowsEl );
                $( nPaging ).append( $selectEl );
                $( nPaging ).append( $gotoEl );
                $( nPaging ).append( $inputEl );
                $( nPaging ).append( $pagingStatEl );
                $( nPaging ).append( $buttonGroup );

                //  Listen Select Change
                $selectEl.change( function()
                {
                    //  Update Length
                    oSettings._iDisplayLength = $selectEl.val();

                    //  Run Draw Callback
                    fnCallbackDraw( oSettings );
                } );

                //  Listen Left Nav
                $leftNavEl.click( function( e )
                {
                    //  Get Current Page
                    var iCurrentPage = Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ) + 1;

                    //  Check
                    if( iCurrentPage > 1 )
                    {
                        //  Set New Start
                        oSettings._iDisplayStart = oSettings._iDisplayLength * ( iCurrentPage - 2 );

                        //  Run Draw Callback
                        fnCallbackDraw( oSettings );
                    }

                    //  Prevent Default
                    e.preventDefault();
                    return false;
                } );

                //  Listen Right Nav
                $rightNavEl.click( function( e )
                {
                    //  Get Current Page
                    var iCurrentPage = Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ) + 1;

                    //  Total Pages
                    var iPages = Math.ceil( ( oSettings.fnRecordsDisplay() ) / oSettings._iDisplayLength );

                    //  Check
                    if( iCurrentPage < iPages )
                    {
                        //  Set New Start
                        oSettings._iDisplayStart = oSettings._iDisplayLength * iCurrentPage;

                        //  Run Draw Callback
                        fnCallbackDraw( oSettings );
                    }

                    //  Prevent Default
                    e.preventDefault();
                    return false;
                } );

                //  Listen On Input
                $inputEl.on( 'keyup change', function( e )
                {
                    //  Passes
                    var passes = ( e.type == 'change' || ( e.type == 'keyup' && e.which == 13 ) );

                    //  Check
                    if( passes )
                    {
                        //  Get the Value
                        var thePage = parseInt( $inputEl.val() );

                        //  Check
                        if( isNaN( thePage ) )  thePage = 1;

                        //  Total Pages
                        var iPages = Math.ceil( ( oSettings.fnRecordsDisplay() ) / oSettings._iDisplayLength );

                        //  Check
                        if( thePage > iPages )  thePage = iPages;

                        //  Set New Start
                        oSettings._iDisplayStart = oSettings._iDisplayLength * ( thePage - 1 );

                        //  Run Draw Callback
                        fnCallbackDraw( oSettings );
                    }
                } );

                //  Set Timeout
                setTimeout( function()
                {
                    //  Table
                    var $table = $( oSettings.nTable )

                    //  Table Wrapper
                    var $tableWrapper = $( oSettings.nTableWrapper );

                    //  Check
                    if( $table.data( 'ignorePaging' ) )
                    {
                        //  Remove
                        $tableWrapper.find( '.dataTables_paginate' ).hide( 0 );
                    }
                    else
                    {
                        //  Init SelectBox
                        init_selectbox( $tableWrapper );
                    }
                }, 1 );
            },

            //  Listen Update
            "fnUpdate": function ( oSettings, fnCallbackDraw )
            {
                //  Table
                var $table = $( oSettings.nTable )

                //  Table Wrapper
                var $tableWrapper = $( oSettings.nTableWrapper );

                //  Check
                if( !$table.data( 'ignorePaging' ) )
                {
                    //  Check Feature
                    if( !oSettings.aanFeatures.p )  return;

                    //  Input El
                    var $inputEl = $( oSettings.aanFeatures.p ).find( '.paging-input' );

                    //  Paging Stat El
                    var $pagingStatEl = $( oSettings.aanFeatures.p ).find( '.paging-stat' );

                    //  Get Current Page
                    var iCurrentPage = Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ) + 1;

                    //  Current Target
                    var iCurrentTarget = ( iCurrentPage * oSettings._iDisplayLength );
                    if( iCurrentTarget > oSettings.fnRecordsTotal() )   iCurrentTarget = oSettings.fnRecordsTotal();

                    //  Update Stat
                    $pagingStatEl.text( ( oSettings._iDisplayStart + 1 ) + ' - ' + iCurrentTarget + ' of ' + oSettings.fnRecordsTotal() );

                    //  Update the Value
                    $inputEl.val( iCurrentPage );
                }

                //  Search the Info
                var $info = $tableWrapper.find( '.dataTables_info' );

                //  Set Timeout
                setTimeout( function()
                {
                    //  Clear
                    $info.html( '' );

                    //  Check
                    if( $table.data( 'infoType' ) )
                    {
                        //  Check for Compiled HTML
                        var $compiled = $info.data( 'compiledInfo' );

                        //  Check
                        if( !$compiled )
                        {
                            //  Check is Button
                            if( $table.data( 'infoType' ) == 'button' )
                            {
                                //  Compile
                                $compiled = $( '<a class="nice-link"></a>' );

                                //  Set Link
                                $compiled.attr( 'href', ( $table.data( 'infoLink' ) ? $table.data( 'infoLink' ) : 'javascript:void(0)' ) );

                                //  Set Text
                                $compiled.html( $table.data( 'infoText' ) );

                                //  Check Class
                                if( $table.data( 'infoClass' ) )    $compiled.addClass( $table.data( 'infoClass' ) );

                                //  Check Target
                                if( $table.data( 'buttonTarget' ) )    $compiled.data( 'target', $table.data( 'buttonTarget' ) );

                                //  Check ID
                                if( $table.data( 'infoId' ) )    $compiled.attr( 'id', $table.data( 'infoId' ) );

                                //  Check Callback
                                if( $table.data( 'infoCallback' ) )    window[$table.data( 'infoCallback' )]( $compiled, oSettings, $table );
                            }
                            else if( $table.data( 'infoType' ) == 'clone' )
                            {
                                //  Get Compiled
                                $compiled = $( $table.data( 'infoClone' ) ).clone();
                            }
                            else if( $table.data( 'infoType' ) == 'callback' )
                            {
                                //  Get Compiled
                                $compiled = window[$table.data( 'infoCallback' )]( oSettings, $table );
                            }

                            //  Store
                            $info.data( 'compiled', $compiled );
                        }

                        //  Append
                        $info.append( $compiled );
                    }
                }, 1 );
            }
        };
    }
} )( window.jQuery );
