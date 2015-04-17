/**
 * Created by Namdascious on 4/16/2015.
 */
//Set editor width
var window_width = $(window).width();
var action_bar_width = $('#action-bar').width();
var content_panel_width = $('#content-panel').width();

//height
var toolbar_height = $('#code-menu-bar').height();
var window_height = $(window).height();

var code_width = window_width - (action_bar_width + content_panel_width);
var code_height = window_height - toolbar_height;
$('#code-window').width(code_width);
$('.editor').width(code_width).height(code_height);

//...
var editor = ace.edit("editor_1");
editor.setTheme("ace/theme/twilight");
editor.getSession().setMode("ace/mode/javascript");
editor.getSession().setUseSoftTabs(true);

var editor2 = ace.edit("editor_2");
editor2.setTheme("ace/theme/twilight");
editor2.getSession().setMode("ace/mode/javascript");
editor2.getSession().setUseSoftTabs(true);

var editor3 = ace.edit("editor_3");
editor3.setTheme("ace/theme/twilight");
editor3.getSession().setMode("ace/mode/javascript");
editor3.getSession().setUseSoftTabs(true);

$('.editor').show();

$('#code-menu-tabs').tabs();