/**
	Handler for a newly submitted answer, builds an _id using the question id plus a timestamp,
	<strong>must be invoked for an existing question</strong>	
	@name answer
	@class
	@memberOf updates
*/
function(doc, req) {
	// !code _attachments/lib/fortytwo.js
	// !code vendor/couchapp/date.js	
	// the existing doc must be a question
	if (doc) {
		// trunk uses req.id, 0.10 req.docId
		//if (!req.id) req.id = req.docId;
		
		var answer = eval('('+req.body+')');
		
		// store servertime...
		answer.created = (new Date()).toJSON();
		
		// copy question creation date
		answer.question_created = doc.created;
				
		var reply = {
			ok: 'answer accepted',
			answer: answer
		}
		
		return [answer, toJSON(reply)];
	}
	return [null, '{"ok":"ignored"}'];

}