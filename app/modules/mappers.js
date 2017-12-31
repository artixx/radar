function mapFiles(files) {
    return files.map(one => ({
        path: 'https://2ch.hk' + one.path,
        name: one.fullname,
        md5: one.md5,
        type: one.type,
    }))
}

function mapThreads(threads) {
    return threads.map(one => ({
        id: Number(one.num),
        postsCount: one.posts_count,
        dislikes: one.dislikes,
        likes: one.likes,
        timestamp: one.timestamp,
        subject: one.subject,
        comment: one.comment,
        files: mapFiles(one.files),
    }))
}

function mapThreadsLight(threads) {
    return threads.map(one => ({
        id: Number(one.thread_num),
        postsCount: one.posts_count,
        dislikes: one.posts[0].dislikes,
        likes: one.posts[0].likes,
        timestamp: one.posts[0].timestamp,
        subject: one.posts[0].subject,
        comment: one.posts[0].comment,
        files: mapFiles(one.posts[0].files),
    }))
}

function mapPosts(posts) {
    return posts.map(one => ({
        id: Number(one.num),
        dislikes: one.dislikes,
        likes: one.likes,
        timestamp: one.timestamp,
        subject: one.subject,
        comment: one.comment,
        files: mapFiles(one.files),
    }))
}

function mapThread(thread) {
    const posts = mapPosts(thread.threads[0].posts)
    const opPost = posts[0]
    return {
        id: Number(opPost.id),
        dislikes: opPost.dislikes,
        likes: opPost.likes,
        timestamp: opPost.timestamp,
        subject: opPost.subject,
        comment: opPost.comment,
        files: opPost.files,
        posts: posts,
        postsCount: thread.posts_count,
        uniquePosters: thread.unique_posters,
    }
}

module.exports = {
    mapThreads,
    mapThreadsLight,
    mapThread,
}
