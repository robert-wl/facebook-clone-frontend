package model

import "time"

type Post struct {
	ID           string      `json:"id"`
	UserID       string      `json:"userId" gorm:"foreignKey:UserID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	User         *User       `json:"user"`
	Content      string      `json:"content"`
	Privacy      string      `json:"privacy"`
	LikeCount    int         `json:"likeCount"`
	CommentCount int         `json:"commentCount"`
	ShareCount   int         `json:"shareCount"`
	Files        []*string   `json:"files,omitempty" gorm:"json"`
	Likes        []*PostLike `json:"likes,omitempty"`
	Comments     []*Comment  `json:"comments,omitempty" gorm:"foreignKey:ParentCommentID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	CreatedAt    time.Time   `json:"createdAt"`
}

type Comment struct {
	ID              string         `json:"id"`
	UserID          string         `json:"userId"`
	User            *User          `json:"user" gorm:"foreignKey:UserID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Content         string         `json:"content"`
	LikeCount       int            `json:"likeCount"`
	ReplyCount      int            `json:"replyCount"`
	ParentPostID    string         `json:"parentPostId"`
	ParentPost      *Post          `json:"parentPost,omitempty" gorm:"foreignKey:ParentPostID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	ParentCommentID string         `json:"parentCommentId"`
	ParentComment   *Comment       `json:"parentComment,omitempty" gorm:"foreignKey:ParentCommentID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Likes           []*CommentLike `json:"likes,omitempty" gorm:"foreignKey:CommentID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	Comments        []*Comment     `json:"comments,omitempty" gorm:"foreignKey:ParentCommentID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	CreatedAt       time.Time      `json:"createdAt"`
}

type CommentLike struct {
	CommentID string `json:"commentId"`
	UserID    string `json:"userId"`
	User      *User  `json:"user" gorm:"foreignKey:UserID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}

type NewPost struct {
	Content string    `json:"content"`
	Privacy string    `json:"privacy"`
	Files   []*string `json:"files,omitempty"`
}

type PostLike struct {
	PostID string `json:"postId"`
	UserID string `json:"userId"`
	User   *User  `json:"user" gorm:"foreignKey:UserID;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
