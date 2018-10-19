var collection = {};

function get_frm_cache(selector) {
    if (undefined === collection[selector] || !collection[selector].length) {
        collection[selector] = $(selector);
    }

    return collection[selector];
};


module.exports = {getNode: get_frm_cache};