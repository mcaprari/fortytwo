// paths relative to the design document
var CFG = {
	preview_length: 100,
	path: {
		path_ask: '/_show/ask',
		path_login: '/_show/auth',
		path_results: '/_show/results',
		path_question: '/_list/question_and_answers/questions',	
		path_update_answer: '/_update/answer',
		path_question_list: '/_list/questions_index/questions_index?descending=true',
		path_update_question: '/_update/question',
		path_docs: '/docs/index.html'
	}
}
function url_info(req) {
	var scheme = 'http';
	var host = req['headers']['X-Forwarded-Host'] || req['headers']['Host'];
	var _design_idx = req['path'].indexOf('_design');
	var design_base = req['path'].slice(0, _design_idx+2).join('/');
	return {	
		app_root: '/' + design_base,
		host: scheme + '://' + host,
		referer: req['headers']['Referer']
	}
}
function auth_info(req) {
	return {
		auth_need_login: !(req.userCtx && req.userCtx.name),
		auth_username: req.userCtx && req.userCtx.name
	};
}
// recursive object merge
function merge(A, B) {
	var k, r = {};
	for (k in A) r[k] = A[k];
	for (k in B) r[k] = B[k];
	if (arguments.length >= 2) {
		Array.prototype.splice.call(arguments, 0, 2, r);
 		return merge.apply(null, arguments);
	}
	return r;
}