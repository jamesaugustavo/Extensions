/**
 * This function allows you to prepend or append code to an existing function.
 * https://stackoverflow.com/questions/9134686/adding-code-to-a-javascript-function-programmatically
 */
function functionExtender(container, funcName, prepend, append) {
	(function () {
		'use strict';
		let cachedFunction = container[funcName];

		container[funcName] = function () {
			if (prepend) {
				prepend.apply(this);
			}

			let result = cachedFunction.apply(this, arguments);

			if (append) {
				append.apply(this);
			}

			return result;
		};
	})();
}

/**
 * This controls what happens when you click TAB on a selected search item.
 */
functionExtender(
	MMSearchField.prototype,
	'Event_Keydown',
	function () {},
	function () {
		let tabTarget = this.selected_item;

		if (tabTarget !== null) {
			if (event.keyCode === 9 && tabTarget !== this.menu_item_storesearch) {
				this.element_search.value = tabTarget.childNodes[0].getAttribute('data-search');
			}
		}
	}
);


MMSearchField.prototype.onMenuAppendHeader = function () {
	return null;
};

MMSearchField.prototype.onMenuAppendItem = function (data) {
	let searchResult;

	searchResult = newElement('li', {'class': 'x-search-preview__entry'}, null, null);
	searchResult.innerHTML = data;
	searchResult.setAttribute('aria-selected', 'false');
	searchResult.setAttribute('role', 'option');

	return searchResult;
};

MMSearchField.prototype.Menu_Item_Select = function (item) {
	this.selected_item = item;
	this.menu_items.forEach(function (menuItem) {
		menuItem.setAttribute('aria-selected', 'false');
	});

	if (item !== null) {
		this.selected_item.className = classNameAdd( this.selected_item, 'mm_searchfield_menuitem_selected' );
		this.selected_item.setAttribute('aria-selected', 'true');
	}
};

MMSearchField.prototype.onMenuAppendStoreSearch = function (search_value) {
	let searchAll;

	searchAll = newElement('li', {'class': 'x-search-preview__search-all'}, null, null);
	searchAll.element_text = newTextNode('Search store for product "' + search_value + '"', searchAll);
	searchAll.setAttribute('aria-selected', 'false');
	searchAll.setAttribute('role', 'option');

	return searchAll;
};

MMSearchField.prototype.onFocus = function () {
	this.element_menu.classList.toggle('x-search-preview--open');
};

MMSearchField.prototype.onBlur = function () {
	this.element_menu.classList.toggle('x-search-preview--open');
};
