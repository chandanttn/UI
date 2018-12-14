let _noOfExternalHTMLTemplates = 10;
let _HTMLtemplateLoaded = 0;
let _isAllTemplatesLoaded = false;

module.exports = {

    channelListHTML: '',
    infoTemplateHTML: '',
    languageTemplateHTML: '',
    nextButtonSlideLeftHTML: '',
    overlayTempalteHTML: '',
    qualityTemplateHTML: '',
    videoControlsTempalteHTML: '',
    startoverBtnHTML: '',
    startoverVideoBtnsHTML: '',

    isAllTmpltsLoaded() {
        return _isAllTemplatesLoaded;
    },

    loadHTMLtemplates() {

        $.get("/ottservices/KplusWebPlayer/template/overlay-container-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.overlayTempalteHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/channels-list-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.channelListHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/info-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.infoTemplateHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/language-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.languageTemplateHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/quality-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.qualityTemplateHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/next-btn-broadcast-sch-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.nextButtonSlideLeftHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/video-controls-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.videoControlsTempalteHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/bitrate-chart-rows-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.bitrateChartRowsHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

        $.get("/ottservices/KplusWebPlayer/template/startover-bar-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.startoverBtnHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });


        $.get("/ottservices/KplusWebPlayer/template/startover-prog-end-btns-tpl.html" + "?version=" + '@@project-version-placeholder').then( (data) => {
            this.startoverVideoBtnsHTML = data;
            _HTMLtemplateLoaded++;
            if (_HTMLtemplateLoaded === _noOfExternalHTMLTemplates) {
                _isAllTemplatesLoaded = true;
            }
        });

    }
}
