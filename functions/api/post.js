/* 
note we could easily secure the post with JWT
const jwt = require('@tsndr/cloudflare-worker-jwt');
*/


//update the post
export async function onRequestPost(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;

        //note this is not working locally so will have to test when its on live
        //postData = await request.json();
        //replace it
        const responseClone = request.clone(); // Clone the response
        //const originalBody = await response.text(); // Read the body of the original response
        const clonedBody = await responseClone.json(); // Read the body of the cloned response
        //build the query
        const theSQL = `UPDATE posts SET  body = '${clonedBody.content}' WHERE id = '${clonedBody.postId}'`;
        //console.log(theSQL);
        //prepare the query
        const stmt = context.env.D1DATA.prepare(theSQL);
        //run it
        const stmtResult = await stmt.run();
        //console.log(stmtResult)
        //check if it is saved or not
        if (stmtResult.success == true) 
            return new Response(JSON.stringify({ result: "ok" }), { status: 200 });
        else
            return new Response(JSON.stringify({ error: "record not updated" }), { status: 400 });

}

//update the get 
export async function onRequestGet(context) {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context;
    //get the requests urls
    const { searchParams } = new URL(request.url);
    //get the post id
    const postId = searchParams.get('postId');
    //check the post id is set
    if ((postId == undefined) || (postId == ""))
        return new Response(JSON.stringify({ error: "no Id" }), { status: 400 });
    //build the query
    const theSQL = `SELECT body from posts where id = '${postId}'`;
    //console.log(theSQL);
    //prepare the query
    const query = context.env.D1DATA.prepare(theSQL);
    //run the query
    const queryResult = await query.first();
    //console.log(queryResult.body)
    //check it was a correct query
    if (queryResult == undefined)
    {
        return new Response(JSON.stringify({ error: "databse error" }), { status: 400 });
    }
    //check there are results
    if (queryResult != null)
        return new Response(JSON.stringify({ result: queryResult.body }), { status: 200 });
    else
        return new Response(JSON.stringify({ error: "post not found" }), { status: 400 });

}