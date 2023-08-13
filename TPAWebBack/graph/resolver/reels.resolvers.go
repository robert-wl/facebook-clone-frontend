package resolver

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/yahkerobertkertasnya/TPAWebBack/graph"
	"github.com/yahkerobertkertasnya/TPAWebBack/graph/model"
)

// CreateReel is the resolver for the createReel field.
func (r *mutationResolver) CreateReel(ctx context.Context, reel model.NewReel) (*model.Reel, error) {
	userID := ctx.Value("UserID").(string)

	newReel := &model.Reel{
		ID:           uuid.NewString(),
		UserID:       userID,
		Content:      reel.Content,
		Video:        reel.Video,
		LikeCount:    0,
		CommentCount: 0,
		ShareCount:   0,
		CreatedAt:    time.Now(),
	}

	if err := r.DB.Save(&newReel).Error; err != nil {
		return nil, err
	}

	if err := r.DB.
		Preload("User").
		First(&newReel).Error; err != nil {
		return nil, err
	}

	return newReel, nil
}

// CreateReelComment is the resolver for the createReelComment field.
func (r *mutationResolver) CreateReelComment(ctx context.Context, comment model.NewReelComment) (*model.ReelComment, error) {
	userID := ctx.Value("UserID").(string)

	newComment := &model.ReelComment{
		ID:              uuid.NewString(),
		UserID:          userID,
		Content:         comment.Content,
		LikeCount:       0,
		ReplyCount:      0,
		ParentReelID:    comment.ParentReel,
		ParentCommentID: comment.ParentComment,
		CreatedAt:       time.Time{},
	}

	if err := r.DB.Save(&newComment).Error; err != nil {
		return nil, err
	}

	if err := r.DB.
		Preload("User").
		Preload("ParentReel").
		Preload("ParentReel.User").
		Preload("ParentComment").
		Preload("ParentComment.User").
		First(&newComment).Error; err != nil {
		return nil, err
	}

	return newComment, nil
}

// LikeReel is the resolver for the likeReel field.
func (r *mutationResolver) LikeReel(ctx context.Context, reelID string) (*model.ReelLike, error) {
	userID := ctx.Value("UserID").(string)

	reelLike := &model.ReelLike{
		ReelID: reelID,
		UserID: userID,
	}

	if err := r.DB.First(&model.ReelLike{}, "reel_id = ? and user_id = ?", reelID, userID).Error; err == nil {

		if err := r.DB.Delete(&reelLike).Error; err != nil {
			return nil, err
		}

		return reelLike, nil
	}

	if err := r.DB.Save(&reelLike).Error; err != nil {
		return nil, err
	}

	if err := r.DB.
		Preload("User").
		First(&reelLike).Error; err != nil {
		return nil, err
	}

	return reelLike, nil
}

// LikeReelComment is the resolver for the likeReelComment field.
func (r *mutationResolver) LikeReelComment(ctx context.Context, reelCommentID string) (*model.ReelCommentLike, error) {
	userID := ctx.Value("UserID").(string)

	reelCommentLike := &model.ReelCommentLike{
		ReelCommentID: reelCommentID,
		UserID:        userID,
	}

	if err := r.DB.First(&model.ReelCommentLike{}, "reel_comment_id = ? and user_id = ?", reelCommentID, userID).Error; err == nil {

		if err := r.DB.Delete(&reelCommentLike).Error; err != nil {
			return nil, err
		}

		return reelCommentLike, nil
	}

	if err := r.DB.Save(&reelCommentLike).Error; err != nil {
		return nil, err
	}

	if err := r.DB.
		Preload("User").
		First(&reelCommentLike).Error; err != nil {
		return nil, err
	}

	return reelCommentLike, nil
}

// GetReels is the resolver for the getReels field.
func (r *queryResolver) GetReels(ctx context.Context) ([]*string, error) {
	var reelsID []*string

	if err := r.DB.
		Model(&model.Reel{}).
		Order("RANDOM()").
		Select("id").
		Find(&reelsID).Error; err != nil {
		return nil, err
	}

	return reelsID, nil
}

// GetReel is the resolver for the getReel field.
func (r *queryResolver) GetReel(ctx context.Context, id string) (*model.Reel, error) {
	var reel *model.Reel

	userID := ctx.Value("UserID").(string)

	if err := r.DB.
		Preload("User").
		Preload("Likes").
		Preload("Comments").
		First(&reel, "id = ?", id).Error; err != nil {
		return nil, err
	}

	reel.LikeCount = int(r.DB.Model(reel).Association("Likes").Count())
	reel.CommentCount = int(r.DB.Model(reel).Association("Comments").Count())

	liked := false

	if err := r.DB.First(&model.ReelLike{}, "reel_id = ? AND user_id = ?", id, userID).Error; err == nil {
		liked = true
	}

	reel.Liked = &liked

	return reel, nil
}

// GetReelComments is the resolver for the getReelComments field.
func (r *queryResolver) GetReelComments(ctx context.Context, reelID string) ([]*model.ReelComment, error) {
	var comments []*model.ReelComment

	if err := r.DB.
		Preload("User").
		Preload("ParentReel").
		Preload("ParentComment").
		Preload("Likes").
		Preload("Comments").
		Preload("Comments.User").
		Find(&comments, "parent_reel_id = ?", reelID).Error; err != nil {
		return nil, err
	}

	return comments, nil
}

// LikeCount is the resolver for the likeCount field.
func (r *reelCommentResolver) LikeCount(ctx context.Context, obj *model.ReelComment) (int, error) {

	return int(r.DB.Model(obj).Association("Likes").Count()), nil
}

// ReplyCount is the resolver for the replyCount field.
func (r *reelCommentResolver) ReplyCount(ctx context.Context, obj *model.ReelComment) (int, error) {

	return int(r.DB.Model(obj).Association("Comments").Count()), nil
}

// Comments is the resolver for the comments field.
func (r *reelCommentResolver) Comments(ctx context.Context, obj *model.ReelComment) ([]*model.ReelComment, error) {
	var comments []*model.ReelComment

	fmt.Println(obj.ID)
	if err := r.DB.Preload("User").Find(&comments, "parent_comment_id = ?", obj.ID).Error; err != nil {
		fmt.Println(err)
		return nil, err
	}

	fmt.Println(comments)

	return comments, nil
}

// Liked is the resolver for the liked field.
func (r *reelCommentResolver) Liked(ctx context.Context, obj *model.ReelComment) (*bool, error) {
	var count int64
	boolean := false
	userID := ctx.Value("UserID").(string)

	if err := r.DB.Find(&model.ReelCommentLike{}, "reel_comment_id = ? and user_id = ?", obj.ID, userID).Count(&count).Error; err == nil && count != 0 {
		boolean = true
	}

	return &boolean, nil
}

// ReelComment returns graph.ReelCommentResolver implementation.
func (r *Resolver) ReelComment() graph.ReelCommentResolver { return &reelCommentResolver{r} }

type reelCommentResolver struct{ *Resolver }
