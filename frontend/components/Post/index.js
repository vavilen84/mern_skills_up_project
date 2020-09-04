import React from 'react'
import { Link } from '../../routes'

const PostItem = ({ post }) => (
  <div>
    <Link route='post' params={{ slug: post.title }}>
      <a>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </a>
    </Link>
  </div>
)

export default PostItem
