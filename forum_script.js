document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts");
    const postContentInput = document.getElementById("post-content");
    const postButton = document.getElementById("post-button");

    let posts = JSON.parse(localStorage.getItem("forumPosts")) || [];

    if (posts.length === 0) {
        posts = [
            {
                title: "Website Discussion",
                content: "This is a good example of a great website advocacy...",
                author: "Pogi_user_Ulat",
                votes: 12,
                comments: [
                    { author: "Blas", text: "Great post! Online safety is really important.", replies: [] },
                    { author: "J.Cruz", text: "Totally agree! People should be more aware of the risks.", replies: [] },
                    { author: "Ashley123", text: "I feel like I've seen the website layout before......", replies: [] },
                    { author: "E_rica", text: "Well, I feel like I was one of the designer↑", replies: [] }
                ]
            },
            {
                title: "How to Stay Safe Online",
                content: "What are some good tips to protect personal information online?",
                author: "CyberSec_Enthusiast",
                votes: 20,
                comments: [
                    { author: "TechSavvy", text: "Use strong passwords and enable 2FA.", replies: [] },
                    { author: "SecurityNerd", text: "Always verify links before clicking!", replies: [] }
                ]
            }
        ];
        savePosts();
    }

    function savePosts() {
        localStorage.setItem("forumPosts", JSON.stringify(posts));
    }

    function renderPosts() {
        postsContainer.innerHTML = "";

        posts.forEach((post, postIndex) => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <div class="post-header">
                    <h3>${post.title}</h3>
                    <span class="post-author">by ${post.author}</span>
                </div>
                <p class="post-content">${post.content}</p>

                <div class="post-actions">
                    <button class="upvote">⬆️</button>
                    <span class="vote-count">${post.votes}</span>
                    <button class="downvote">⬇️</button>
                    <button class="comment-toggle">💬 ${post.comments.length} Comments</button>
                </div>

                <div class="comments hidden">
                    <div class="comment-list"></div>
                    <input type="text" class="comment-input" placeholder="Add a comment...">
                    <button class="comment-submit">Post</button>
                </div>
            `;

            const commentToggleBtn = postElement.querySelector(".comment-toggle");
            const commentSection = postElement.querySelector(".comments");
            const commentContainer = postElement.querySelector(".comment-list");

            renderComments(posts[postIndex].comments, commentContainer, postIndex);

            commentToggleBtn.addEventListener("click", () => {
                commentSection.classList.toggle("hidden");
            });

            postElement.querySelector(".upvote").addEventListener("click", () => {
                posts[postIndex].votes++;
                savePosts();
                renderPosts();
            });

            postElement.querySelector(".downvote").addEventListener("click", () => {
                posts[postIndex].votes--;
                savePosts();
                renderPosts();
            });

            postElement.querySelector(".comment-submit").addEventListener("click", () => {
                const commentInput = postElement.querySelector(".comment-input");
                const commentText = commentInput.value.trim();
                if (commentText) {
                    const newComment = { author: "Anonymous", text: commentText, replies: [] };
                    posts[postIndex].comments.push(newComment);
                    savePosts();
                    renderPosts();
                }
            });

            postsContainer.prepend(postElement);
        });
    }

    function renderComments(commentsArray, commentContainer, postIndex) {
        commentContainer.innerHTML = "";

        commentsArray.forEach((comment, commentIndex) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
                <span class="comment-author">${comment.author}:</span>
                <p>${comment.text}</p>
                <button class="reply-button">Reply</button>
                <div class="replies"></div>
            `;

            const replyInput = document.createElement("input");
            replyInput.type = "text";
            replyInput.placeholder = "Write a reply...";
            replyInput.classList.add("reply-input");
            replyInput.style.display = "none";

            const replySubmit = document.createElement("button");
            replySubmit.textContent = "Post Reply";
            replySubmit.classList.add("reply-submit");
            replySubmit.style.display = "none";

            commentElement.appendChild(replyInput);
            commentElement.appendChild(replySubmit);

            commentElement.querySelector(".reply-button").addEventListener("click", () => {
                replyInput.style.display = "block";
                replySubmit.style.display = "block";
                replyInput.focus();
            });

            replySubmit.addEventListener("click", () => {
                const replyText = replyInput.value.trim();
                if (replyText) {
                    const reply = { author: "Anonymous", text: replyText };
                    posts[postIndex].comments[commentIndex].replies.push(reply);
                    savePosts();
                    renderPosts();
                }
            });

            const repliesContainer = commentElement.querySelector(".replies");
            renderComments(comment.replies, repliesContainer, postIndex);

            commentContainer.appendChild(commentElement);
        });
    }

    postButton.addEventListener("click", () => {
        const postText = postContentInput.value.trim();
        if (postText) {
            const newPost = {
                title: "New Post",
                content: postText,
                author: "Anonymous",
                votes: 0,
                comments: []
            };
            posts.push(newPost);
            savePosts();
            renderPosts();
            postContentInput.value = "";
        }
    });

    renderPosts();
});
