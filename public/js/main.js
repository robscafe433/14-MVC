// public/js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // Toggle new post form visibility
    const newPostBtn = document.getElementById("new-post-btn");
    const newPostForm = document.getElementById("new-post-form");

    if (newPostBtn && newPostForm) {
        newPostBtn.addEventListener("click", () => {
            newPostForm.style.display =
                newPostForm.style.display === "none" ? "block" : "none";
        });
    }

    // Handle post creation
    const newPostFormElement = document.querySelector("#new-post-form form");
    if (newPostFormElement) {
        newPostFormElement.addEventListener("submit", async (event) => {
            event.preventDefault();
            const title = document.getElementById("title").value.trim();
            const content = document.getElementById("content").value.trim();

            if (title && content) {
                const response = await fetch("/posts", {
                    method: "POST",
                    body: JSON.stringify({ title, content }),
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    document.location.reload();
                } else {
                    alert("Failed to create post");
                }
            }
        });
    }

    // Handle post edits
    const editPostBtns = document.querySelectorAll(".edit-post-btn");
    editPostBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const postId = event.target.getAttribute("data-id");
            const title = prompt("Enter new title:");
            const content = prompt("Enter new content:");

            if (title && content) {
                const response = await fetch(`/posts/${postId}`, {
                    method: "PUT",
                    body: JSON.stringify({ title, content }),
                    headers: { "Content-Type": "application/json" },
                });

                if (response.ok) {
                    document.location.reload();
                } else {
                    alert("Failed to update post");
                }
            }
        });
    });

    // Handle post deletions
    const deletePostBtns = document.querySelectorAll(".delete-post-btn");
    deletePostBtns.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const postId = event.target.getAttribute("data-id");

            const response = await fetch(`/posts/${postId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert("Failed to delete post");
            }
        });
    });
});
