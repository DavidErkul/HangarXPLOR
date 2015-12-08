
var HangarXPLOR = HangarXPLOR || {};

// Render a dropdown that sets the value of an element
HangarXPLOR.Dropdown = function(options, width, className)
{
  console.log('Rendering Dropdown', options);
  
  className = className || 'js-custom-filter';
  width = width || '150px';
  
  var $ul = $('<ul class="body" style="display: none" />');
  var $style = $('<div class="js-selectlist selectlist" />');
  var $label = $('<span>' + options[0].Text + '</span>');
  var $value = $('<input type="hidden" class="' + className + '" value="' + options[0].Value + '" />');
  var $dropdown = $('<div style="width: ' + width + '">');
  
  for (var i = 0, j = options.length; i < j; i++)
    $ul.append('<li class="js-option option ' + (options[i].Class || '') + '" rel="' + options[i].Value + '">' + options[i].Text + '</li>');
  var $options = $('li', $ul);
  
  $dropdown.append($style);
  $style.append('<div class="arrow" />');
  $style.append($label);
  $style.append($ul);
  $style.append($value);
  
  $options.bind('mouseover', function() { $(this).addClass('hover'); });
  $options.bind('mouseout', function() { $(this).removeClass('hover'); });
  
  $dropdown.bind('click', function() { $ul.toggle(); });
  $options.bind('click', function() {
    var $this = $(this);
      
    var nextFilter = $this.attr('rel');
    
    $options.removeClass('selected');
    $options.removeClass('hover');
    $this.addClass('selected');
    
    if ($value.val() != nextFilter) {
      $value.val(nextFilter);
      $label.text($this.text());
      HangarXPLOR.Render(className);
    }
    
    $('ul.body').hide();
    
    return false;
  });
  
  return $dropdown;
}