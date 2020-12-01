const enumConst = require('../../enum/enum');

module.exports.HOME_PAGE = {
    image: "/path/to/image.png",
    uniqueKey: "homePage",
    url: "/",
    title: null,
    relatedPostIds: [],
    tags: [],
    keywords: "one, two",
    description: "three, four",
    greeting: "greeting string",
    content: "content string",
    status: enumConst.PostStatuses.ACTIVE,
    created: null,
    updated: null
};

module.exports.POST_1 = {
    image: "/path/to/image.png",
    uniqueKey: null,
    url: "/post-1",
    title: "Post 1",
    relatedPostIds: [],
    tags: ["php", "server"],
    keywords: "one, two",
    description: "three, four",
    greeting: null,
    content: "content string",
    status: enumConst.PostStatuses.ACTIVE,
    created: null,
    updated: null
};

module.exports.POST_2 = {
    image: "/path/to/image.png",
    uniqueKey: null,
    url: "/post-2",
    title: "Post 2",
    relatedPostIds: [],
    tags: ["php", "server"],
    keywords: "one, two",
    description: "three, four",
    greeting: null,
    content: "content string",
    status: enumConst.PostStatuses.ACTIVE,
    created: null,
    updated: null
};