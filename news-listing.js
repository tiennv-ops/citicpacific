function setCookie(cname, cvalue, exdays) {
	var safeName = String(cname || '').replace(/[^A-Za-z0-9_-]/g, '');
	if (!safeName) {
		return;
	}
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = safeName + "=" + encodeURIComponent(String(cvalue || '')) + ";" + expires + ";path=/;SameSite=Lax";
  }
  
  function getCookie(cname) {
	var safeName = String(cname || '').replace(/[^A-Za-z0-9_-]/g, '');
	if (!safeName) {
		return "";
	}
	var escapedName = safeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	var match = document.cookie.match(new RegExp('(?:^|; )' + escapedName + '=([^;]*)'));
	return match ? decodeURIComponent(match[1]) : "";
  }
  
  function checkCookie() {
	var user = getCookie("username");
	if (user != "") {
	  alert("Welcome again " + user);
	} else {
	  user = prompt("Please enter your name:", "");
	  if (user != "" && user != null) {
		setCookie("username", user, 365);
	  }
	}
  }
  
  /* <span style="white-space: nowrap;"></span> */
  jQuery(document).ready(function($){
	  //set max title pag listing when load page 1th
	  (function(d){
		  d.fn.ellipsis = function(options){
			  var settings = d.extend({ lines: 'auto', ellipClass: 'ellip' }, options || {});
			  return this.each(function(){
				  var element = this;
				  var lineCount = parseInt(settings.lines, 10);
				  d(element).addClass(settings.ellipClass);
				  if (lineCount > 0) {
					  element.style.display = '-webkit-box';
					  element.style.webkitBoxOrient = 'vertical';
					  element.style.webkitLineClamp = String(lineCount);
					  element.style.overflow = 'hidden';
				  }
			  });
		  };
	  }(jQuery));

	  function sanitizeLogValue(value) {
		  return String(value || '').replace(/[\r\n\t]/g, ' ').replace(/[<>]/g, '').slice(0, 160);
	  }

	  function logAjaxError(stat, error) {
		  if (window.console && typeof window.console.warn === 'function') {
			  window.console.warn('News listing AJAX request failed.', sanitizeLogValue(stat), sanitizeLogValue(error));
		  }
	  }

	  function extractMainContent(responseText) {
		  return String(responseText || '').replace(/^[\s\S]*<main.*?>|<\/main>[\s\S]*$/ig, '');
	  }

	  function sanitizeHtmlFragment(rawMarkup) {
		  var parser = new DOMParser();
		  var parsedDocument = parser.parseFromString(String(rawMarkup || ''), 'text/html');
		  var blockedTags = ['SCRIPT', 'STYLE', 'OBJECT', 'EMBED'];
		  parsedDocument.body.querySelectorAll('*').forEach(function(element){
			  if (blockedTags.indexOf(element.tagName) !== -1) {
				  element.remove();
				  return;
			  }
			  Array.prototype.slice.call(element.attributes).forEach(function(attribute){
				  var attrName = attribute.name.toLowerCase();
				  var attrValue = String(attribute.value || '').trim().toLowerCase();
				  if (attrName.indexOf('on') === 0 || attrValue.indexOf('javascript:') === 0) {
					  element.removeAttribute(attribute.name);
				  }
			  });
		  });
		  var fragment = document.createDocumentFragment();
		  Array.prototype.slice.call(parsedDocument.body.childNodes).forEach(function(node){
			  fragment.appendChild(document.importNode(node, true));
		  });
		  return fragment;
	  }

	  function setSafeHtml($target, rawMarkup) {
		  $target.empty().append(sanitizeHtmlFragment(rawMarkup));
	  }

	  function setMessage($target, message, className) {
		  var paragraph = document.createElement('p');
		  if (className) {
			  paragraph.className = className;
		  }
		  paragraph.textContent = String(message || '');
		  $target.empty().append(paragraph);
	  }

	  function parseJsonResponse(response) {
		  try {
			  return (typeof response === 'string') ? JSON.parse(response) : response;
		  } catch (e) {
			  logAjaxError('parse_error', e && e.message);
			  return null;
		  }
	  }

	  function isSafeTabId(tab) {
		  return typeof tab === 'string' && /^[A-Za-z0-9_-]+$/.test(tab);
	  }

	  function getTabContent(tab) {
		  if (!isSafeTabId(tab)) {
			  return jQuery();
		  }
		  return jQuery(document.getElementById(tab));
	  }

	  function normalizeHash(value) {
		  var hash = String(value || '');
		  if (hash.charAt(0) !== '#') {
			  return '';
		  }
		  return isSafeTabId(hash.substring(1)) ? hash : '';
	  }

	  function hashToTabId(hash) {
		  var safeHash = normalizeHash(hash);
		  return safeHash ? safeHash.substring(1) : '';
	  }

	  function findTabListItemByHash(hash) {
		  var safeHash = normalizeHash(hash);
		  if (!safeHash) {
			  return jQuery();
		  }
		  return jQuery('.news-listing-page .tab-titles li a, .tab-titles li a').filter(function(){
			  return jQuery(this).attr('href') === safeHash;
		  }).parent('li');
	  }

	  function activateTabById(tab) {
		  var $tabContent = getTabContent(tab);
		  if (!$tabContent.length) {
			  return false;
		  }
		  jQuery('.tab-content, .news-listing-page .tab-titles li').removeClass('active');
		  $tabContent.addClass('active');
		  findTabListItemByHash('#' + tab).addClass('active');
		  return true;
	  }
	  
	  if (jQuery('.news-listing-page').length > 0) {
		  var width_window = jQuery(window).width();
		  if ((width_window > 767) || (width_window < 992)) {
			  jQuery('.news-listing-page .content-item.content-n3 .col-left a').ellipsis({ lines: 5 });
		  }
	  }
	  //Function carousel after load ajax detail
	  function carouselNewBlog(){
		  if(jQuery('.citic-single-post .category-list').length > 0){
			  var swiper = new Swiper('.citic-single-post .category-list', {
				  slidesPerView: 'auto',
				  spaceBetween: 5,
				  
				  clickable: true,
				  scrollbar: {
					  el: '.citic-single-post .dot-carousel',
					  hide: false,
					  clickable: true,
  
				  },
				   breakpoints: {
					  768: {
						
						spaceBetween: 7,
						
					  },
					  1199: {		          
						spaceBetween: 21,
						
					  },
				  }
			  });
		  }
	  }
	  //Function scroll after load ajax detail
	  function ScrollFixedNewDetail(){
		  if (jQuery(".new-listing-pupup .content-popup")) {
			  jQuery('body').addClass('hidden');
			  jQuery('.new-listing-pupup').css('transform', 'initial');
			  if (jQuery(".new-listing-pupup .col-left").length > 0) {
				  jQuery('.new-listing-pupup').scroll(function() {
					  jQuery('.citic-single-post .col-left').css('position','fixed');
					  /*step 1: add css margin-top = 0 for content fixed and calculate the height*/
					  var jQueryself = jQuery(".citic-single-post .col-left");
					  jQueryself.css('margin-top', 0);
					  var fixedDivOffset = jQueryself.offset().top + jQueryself.outerHeight(true);
					  // if reaches footer
					  if (fixedDivOffset > jQuery(".citic-single-post .container-carousel").offset().top ) {
						  jQueryself.css('margin-top', -(fixedDivOffset - jQuery(".citic-single-post .container-carousel").offset().top));
					  } else {
						  jQueryself.css('margin-top', '0');
					  }
				  });
			  }
		  }
			  
	  }
	  //Function scroll to after load ajax detail
	  function ScrollTopDetail(){
		  if (jQuery(".new-listing-pupup .content-popup").length > 0) {
			  jQuery(".new-listing-pupup").animate({ scrollTop: 0 }, 0);
		  }
	  }
	  
	  //function hover carousel botton new detail
	  function HoverNewDetailBottom(){
		  if (jQuery(".citic-single-post .category-list").length > 0) {
			  jQuery(".citic-single-post .category-list").hover(
				  function() {
					  jQuery('.citic-single-post .cursor').addClass('show');
				  },
				  function() {
					  jQuery('.citic-single-post .cursor').removeClass('show');
				  }
			  );
			  function updateProperties(elem, state) {
				  elem.style.setProperty('--x', state.x+'px')
				  elem.style.setProperty('--y', state.y+'px')
				  elem.style.setProperty('--width', state.width+'px')
				  elem.style.setProperty('--height', state.height+'px')
				  elem.style.setProperty('--radius', state.radius)
				  elem.style.setProperty('--scale', state.scale)
			  }
  
			  if (window.NodeList && !NodeList.prototype.forEach) {
				NodeList.prototype.forEach = Array.prototype.forEach;
			  }
  
				  document.querySelectorAll('.citic-single-post .cursor').forEach(function(cursor){
					  let onElement;
  
					  function createState(e) {
						  var state = {
							  x: e.clientX,
							  y: e.clientY,
							  width: 64,
							  height: 64,
							  radius: '50%'
						  };

						  if (onElement != null) {
							  var rect = onElement.getBoundingClientRect();
							  var radius = window.getComputedStyle(onElement).borderTopLeftRadius;
							  state.x = rect.left + rect.width / 2;
							  state.y = rect.top + rect.height / 2;
							  state.width = rect.width;
							  state.height = rect.height;
							  state.radius = radius;
						  }
						  return state;
					  }
  
				  document.addEventListener('mousemove', function(e){
					  const state = createState(e);
					  updateProperties(cursor, state);
				  })
			  })
		  }
  
	  }
	  //function fix AOS not run in carousel pupup
	  function FixAOS(){
		  jQuery('.new-listing-pupup').scroll(function(){
			  if($('.new-listing-pupup .container-carousel').length > 0) {
				  var window_height_pupup = jQuery(window).height();
				  var topCarousel = jQuery('.new-listing-pupup .container-carousel').offset().top;
				  var window_height_pupup = window_height_pupup/1.25;
				  if (topCarousel < window_height_pupup) {
					  jQuery('.new-listing-pupup .container-carousel').addClass('aos-animate');
				  }
			  }
		  });
	  }
	  //function check header's height
	  function HeaderHeight(){
		  let HeaderHeight =  jQuery("header").height();
		  jQuery('main').css("margin-top",HeaderHeight);
  
	  }
	  if (jQuery("body.page-template-template-news-listing").length > 0) {
		  HeaderHeight();
		  jQuery(window).resize(function(){
			  HeaderHeight();
		  });
	  }
	  //ajax pupup 
	  if(jQuery('body.single-post .carousel-postdetail').length > 0){
		  var numberElementCarousel = jQuery('.citic-single-post .category-list div.item').length; 
		  if (numberElementCarousel > 1) {
			  HoverNewDetailBottom();		
		  }
		  else{
			  jQuery('.page-template-template-news-listing .show-cursor').addClass('notnone-cursor');
		  }
	  }
	  //ajax pupup 
	  if(jQuery('body.home .section-news').length > 0){
		  jQuery('.home .section-news .list-news .item .item-info a').click(function(){
			  setCookie('post-url', jQuery(this).attr('data-post-url') , 1);
			  // return false;
		  });
	  }
	function newListingAll() {
	  if(jQuery('.news-listing-page .popup-detailq').length > 0){
		  if(getCookie('post-url')){
			  jQuery.ajax({
				  url: getCookie('post-url'),
				  type: 'POST',
				  async: true
			  }).done(function(response, status){
				  setSafeHtml(jQuery('.content-popup'), extractMainContent(response));
				  //Call function carousel
				  carouselNewBlog();
				  // scoll pupup detail
				  ScrollFixedNewDetail();
				  //hover
				  // HoverBackNewDetail();
				  //hover carousel bottom detail
				  
				  var numberElementCarousel = jQuery('.citic-single-post .category-list div.item').length; 
				  if (numberElementCarousel > 1) {
					  HoverNewDetailBottom();	
				  }
				  else{
					  jQuery('.page-template-template-news-listing .show-cursor').addClass('notnone-cursor');
				  }
				  //Run AOS
				  AOS.init();
				  //fix AOS in carousel not run
				  FixAOS();		
				  //ScrollTop after load ajax
				  ScrollTopDetail();
				  
			  }).fail(function(jqXHR, stat, error) {
				  logAjaxError(stat, error);
			  }); 
			  setTimeout(function(){
					 jQuery('.detail-popup').addClass('show');
					 setCookie('post-url', '', 0.00000001);
				 }, 800);
		  }
  
  
		  $(document).on('click','.news-listing-page .popup-detailq',function(event){
				 event.preventDefault();
			  var urlBox = jQuery(this).attr('href'); 
			  var formData = jQuery(this).serialize();
			  jQuery.ajax({
				  url: urlBox,
				  type: 'POST',
				  data: formData,
				  async: true
			  }).done(function(response, status){
				  setSafeHtml(jQuery('.content-popup'), extractMainContent(response));
				  //Call function carousel
				  carouselNewBlog();
				  // scoll pupup detail
				  ScrollFixedNewDetail();
				  //hover
				  // HoverBackNewDetail();
				  //hover carousel bottom detail
				  
				  var numberElementCarousel = jQuery('.citic-single-post .category-list div.item').length; 
				  if (numberElementCarousel > 1) {
					  HoverNewDetailBottom();
				  }
				  else{
					  jQuery('.page-template-template-news-listing .show-cursor').addClass('notnone-cursor');
				  }
				  //Run AOS
				  AOS.init();
				  //fix AOS in carousel not run
				  FixAOS();		
				  //ScrollTop after load ajax
				  ScrollTopDetail();
				  
			  }).fail(function(jqXHR, stat, error) {
				  logAjaxError(stat, error);
			  }); 
			  setTimeout(function(){
					 jQuery('.detail-popup').addClass('show');
				 }, 800);
		  });
		  $(document).on('click','.news-listing-page a.item-img',function(event){
				 event.preventDefault();
			  var urlBox = jQuery(this).attr('href'); 
			  var formData = jQuery(this).serialize();
			  jQuery.ajax({
				  url: urlBox,
				  type: 'POST',
				  data: formData,
				  async: true
			  }).done(function(response, status){
				  setSafeHtml(jQuery('.content-popup'), extractMainContent(response));
				  //Call function carousel
				  carouselNewBlog();
				  // scoll pupup detail
				  ScrollFixedNewDetail();
				  //hover
				  // HoverBackNewDetail();
				  //hover carousel bottom detail
				  
				  var numberElementCarousel = jQuery('.citic-single-post .category-list div.item').length; 
				  if (numberElementCarousel > 1) {
					  HoverNewDetailBottom();
				  }
				  else{
					  jQuery('.page-template-template-news-listing .show-cursor').addClass('notnone-cursor');
				  }
				  //Run AOS
				  AOS.init();
				  //fix AOS in carousel not run
				  FixAOS();		
				  //ScrollTop after load ajax
				  ScrollTopDetail();
				  
			  }).fail(function(jqXHR, stat, error) {
				  logAjaxError(stat, error);
			  }); 
			  setTimeout(function(){
					 jQuery('.detail-popup').addClass('show');
				 }, 800);
		  });
	  }
	  jQuery(document).ajaxComplete(function(){
		  if (jQuery('.link-prev-next').length > 0) {
			  jQuery('.link-prev-next').on('click',function(event){
				  event.preventDefault();
				  var urlBox = jQuery(this).attr('href'); 
				  var formData = jQuery(this).serialize();
				  jQuery.ajax({
					  url: urlBox,
					  type: 'POST',
					  data: formData,
					  async: true
				  }).done(function(DataNewPostDetail,status){
					   setSafeHtml(jQuery('.content-popup'), extractMainContent(DataNewPostDetail));
					  //Call function carousel
					  carouselNewBlog();
					  // scoll pupup detail
					  jQuery('.citic-single-post .col-left').css('position','static');
					  ScrollFixedNewDetail();
					  //hover link back
					  // HoverBackNewDetail();
					  //hover carousel bottom detail
					  var numberElementCarousel = jQuery('.citic-single-post .category-list div.item').length; 
					  if (numberElementCarousel > 1) {
						  HoverNewDetailBottom();
					  }
					  else{
						  jQuery('.page-template-template-news-listing .show-cursor').addClass('notnone-cursor');
					  }
					  //fix AOS in carousel not run
					  FixAOS();
					  //ScrollTop after load ajax
					  ScrollTopDetail();
				  });
			  });
		  }
		  if (jQuery('.content-link-back .link-back').length > 0) {
  
			  jQuery('.content-link-back .link-back').on('click',function(event){
				  jQuery('.detail-popup').removeClass('show');
				  jQuery('.detail-popup').css({'transform': 'translateX(-100%)','-webkit-transform': 'translateX(-100%)'});
				  event.preventDefault();
				  jQuery('body').removeClass('hidden');
			  });
		  }
		  AOS.init();
	  });
	}
	newListingAll();
	  // jQuery('.select2-container--default .select2-results>.select2-results__options')
	  if(jQuery('.news-listing-page form.filter-year').length > 0){
		  jQuery('.news-listing-page form.filter-year select').on( 'change',function(){
			  jQuery('.news-listing-page form.filter-year').submit();
			  var result_val = jQuery('.news-listing-page form.filter-year select').val();
		  });
	  }
	  //scoll animation image left to right
	  if(jQuery('.news-listing-page .animation_image_scroll').length > 0){
		  setTimeout(function(){
			  jQuery('.news-listing-page .full-width:nth-child(1) .animation_image_scroll').each(function() {
				  jQuery(this).addClass('active');
  
			  });
		  }, 0);
	  }
	  //check device-height > 900px
	  if(jQuery('.news-listing-page .animation_image_scroll').length > 0){
		  var window_height = jQuery(window).height();
		  if (window_height > 900) {
			  jQuery('.news-listing-page .animation_image_scroll').each(function() {
				  jQuery(this).addClass('active');
  
			  });
		  }
		  jQuery(window).scroll(function() {
		  jQuery('.animation_image_scroll').each(function(event) {
			  var position = jQuery(this).offset().top;
			  var scroll = jQuery(window).scrollTop();
			  var windowHeight = jQuery(window).height();
			  var difference = position - windowHeight;
			  if (scroll > difference) {
				  jQuery(this).addClass('active');
			  }
			  });
		  });
  
	  }
	  //carousel pag detail
	  if(jQuery('.citic-single-post .category-list').length > 0){
		  var swiper = new Swiper('.citic-single-post .category-list', {
			  slidesPerView: 'auto',
			  spaceBetween: 5,
			  
			  clickable: true,
			  scrollbar: {
				  el: '.citic-single-post .dot-carousel',
				  hide: false,
				  clickable: true,
  
			  },
			   breakpoints: {
				  768: {
					
					spaceBetween: 7,
					
				  },
				  1199: {		          
					spaceBetween: 21,
					
				  },
			  }
		  });
	  }
	  
	  //set max line title reponsive
	  if (jQuery('.news-listing-page').length > 0) {
		  jQuery(window).resize(function(){
			  var width_window = jQuery(window).width();
			  if ((width_window > 767) || (width_window < 992)) {
				  jQuery('.news-listing-page .content-item.content-n3 .col-left a').ellipsis({ lines: 5 });
			  }
		  });
	  }
	  //check search null
	  if (jQuery('.news-listing-page').length > 0) {
		  $('.news-listing-page .tab-content').each(function() {
			  if ($(this).find('.check-search-right').length > 0) {
				  $(this).find('.no-result').css('display','none');
				  // jQuery('.news-listing-page .content-pager').css('display','block');
			  }else{
				  $(this).find('.no-result').css('display','block');
				  // jQuery('.news-listing-page .content-pager').css('display','none');
			  }
		  })
	  }
	  
	  //page new listing detail
	  if (jQuery(".citic-single-post .col-left").length > 0) {
		  jQuery(document).scroll(function() {
			  /*step 1: add css margin-top = 0 for content fixed and calculate the height*/
			  var jQueryself = jQuery(".citic-single-post .col-left");
			  jQueryself.css('margin-top', 0);
			  var fixedDivOffset = jQueryself.offset().top + jQueryself.outerHeight(true);
			  // if reaches footer
			  if (fixedDivOffset > jQuery(".citic-single-post .container-carousel").offset().top ) {
				  jQueryself.css('margin-top', -(fixedDivOffset - jQuery(".citic-single-post .container-carousel").offset().top));
			  } else {
				  jQueryself.css('margin-top', '0');
			  }
		  });
	  }

	  // jQuery for switching between tabs and filtering posts by category
	  $('.news-listing-page .tab-titles li').on('click', function() {
		  var categorySlug = String($(this).data('tab') || ''); // Get category slug
		  if (activateTabById(categorySlug)) {
			  $(this).addClass('active');
		  }
	  });
  
	   // Check if the URL contains the hash 
	   $('.news-listing-page .tab-titles li').each(function() {
		  var attrHref = normalizeHash($(this).find('a').attr('href'));
		  if (attrHref && normalizeHash(window.location.hash) === attrHref) {
			  activateTabById(hashToTabId(attrHref));
		  }
	  });
  
	  // New code from the template starts here
	  const tabStates = new Map(); // Store state (year, search, page) for each validated tab

	  function createTabState() {
		  return {
			  year: 'All',
			  search: '',
			  page: 1
		  };
	  }

	  function ensureTabState(tab) {
		  if (!isSafeTabId(tab)) {
			  return null;
		  }
		  if (!tabStates.has(tab)) {
			  tabStates.set(tab, createTabState());
		  }
		  return tabStates.get(tab);
	  }

	  // Initialize state for each tab
	  $('.tab-titles li').each(function () {
		  const tab = String($(this).data('tab') || '');
		  ensureTabState(tab);
	  });

	  // Function to load posts via AJAX
	  function loadPosts(tab) {
		  const safeTab = String(tab || '');
		  const state = ensureTabState(safeTab);
		  const $tabContent = getTabContent(safeTab);
		  if (!state || !$tabContent.length) {
			  return;
		  }
		  const $postContent = $tabContent.find('.post-content');
		  const $pagination = $tabContent.find('.pagination');

		  $.ajax({
			  url: newsListingData.ajax_url, // From wp_localize_script
			  type: 'POST',
			  data: {
				  action: 'load_news_posts',
				  category: safeTab,
				  year: state.year,
				  search: state.search,
				  page: state.page,
				  lang: newsListingData.lang // From wp_localize_script
			  },
			  beforeSend: function () {
				  setMessage($postContent, newsListingData.translations.loading, 'post-loading');
				  $pagination.hide(); // Hide pagination before AJAX starts
				  $tabContent.find('.no-result').hide();
			  },
			  success: function (response) {
				  const data = parseJsonResponse(response);
				  if (!data) {
					  setMessage($postContent, newsListingData.translations.error_loading, 'post-loading');
					  $pagination.hide();
					  return;
				  }
				  setSafeHtml($postContent, data.posts || '');
				  setSafeHtml($pagination, data.pagination || '');
				  $pagination.toggle(Boolean(data.pagination)); // Show pagination after AJAX finishes
				  $tabContent.find('.result-search').toggle(String(data.search || '') !== '').find('.search-term').text(data.search || '');
				  const $noResult = $tabContent.find('.no-result');
				  $noResult.toggle(String(data.posts || '') === '');
				  setMessage($noResult, newsListingData.translations.no_result, '');
				  populateYears(safeTab); // Populate years dropdown
				  newListingAll();
			  },
			  error: function (jqXHR, stat, error) {
				  setMessage($postContent, newsListingData.translations.error_loading, 'post-loading');
				  $pagination.hide(); // Hide pagination on error
				  logAjaxError(stat, error);
			  }
		  });
	  }

	  // Function to populate years dropdown
	  function populateYears(tab) {
		  const safeTab = String(tab || '');
		  const state = ensureTabState(safeTab);
		  const $tabContent = getTabContent(safeTab);
		  if (!state || !$tabContent.length) {
			  return;
		  }
		  const $select = $tabContent.find('.post-year');
		  const currentYear = state.year;

		  $.ajax({
			  url: newsListingData.ajax_url, // From wp_localize_script
			  type: 'POST',
			  data: {
				  action: 'get_category_years',
				  category: safeTab,
				  lang: newsListingData.lang // From wp_localize_script
			  },
			  success: function (response) {
				  const years = parseJsonResponse(response);
				  if (!Array.isArray(years)) {
					  return;
				  }
				  $select.empty();
				  $select.append(new Option(String(newsListingData.translations.all || 'All'), 'All', false, currentYear === 'All'));
				  years.forEach(function(year) {
					  const yearText = String(year || '');
					  if (/^\d{4}$/.test(yearText)) {
						  $select.append(new Option(yearText, yearText, false, yearText === String(currentYear)));
					  }
				  });
			  }
		  });
	  }

	  // Initial load for active tab
	  const initialTab = String($('.tab-titles li.active').data('tab') || '');
	  if(initialTab){
		  const initialState = ensureTabState(initialTab);
		  if (initialState) {
			  initialState.search = String(newsListingData.initial_search || ''); // Apply initial search if present
			  loadPosts(initialTab);
		  }
	  }

	  // Tab click event
	  $('.tab-titles li').on('click', function () {
		  const tab = String($(this).data('tab') || '');
		  if (activateTabById(tab)) {
			  $(this).addClass('active');
			  loadPosts(tab);
		  }
	  });

	  // Tab click event
	  $('header .primary-menu > li.menu-item-has-children .sub-menu a').on('click', function () {
		  const tabId = hashToTabId($(this).attr('href'));
		  if (activateTabById(tabId)) {
			  loadPosts(tabId);
		  }
	  });

	  // Form submit event for each tab
	  $('.filter-search').on('submit', function (e) {
		  e.preventDefault();
		  const tab = String($(this).data('tab') || '');
		  const state = ensureTabState(tab);
		  if (!state) {
			  return;
		  }
		  state.year = String($(this).find('.post-year').val() || 'All');
		  state.search = String($(this).find('.name-post').val() || '');
		  state.page = 1; // Reset to first page on filter change
		  loadPosts(tab);
	  });

	  // Year change event (optional, for immediate filtering)
	  $('.post-year').on('change', function () {
		  const tab = String($(this).closest('.tab-content').attr('id') || '');
		  const state = ensureTabState(tab);
		  if (!state) {
			  return;
		  }
		  state.year = String($(this).val() || 'All');
		  state.page = 1;
		  loadPosts(tab);
	  });

	  // Pagination click event (delegated)
	  $(document).on('click', '.pagination a', function (e) {
		  e.preventDefault();
		  const tab = String($(this).closest('.pagination').data('tab') || '');
		  const state = ensureTabState(tab);
		  if (!state) {
			  return;
		  }
		  const href = String($(this).attr('href') || '');
		  const match = href.match(/paged=(\d+)/);
		  state.page = match ? parseInt(match[1], 10) : 1;
		  loadPosts(tab);
	  });

	  // End of merged code from template
  });
