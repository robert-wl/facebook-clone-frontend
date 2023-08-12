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

// CreateTextStory is the resolver for the createTextStory field.
func (r *mutationResolver) CreateTextStory(ctx context.Context, input model.NewTextStory) (*model.Story, error) {
	userID := ctx.Value("UserID").(string)

	story := &model.Story{
		ID:        uuid.NewString(),
		UserID:    userID,
		Text:      &input.Text,
		Font:      &input.Font,
		Color:     &input.Color,
		CreatedAt: time.Now(),
	}

	if err := r.DB.Save(&story).Error; err != nil {
		return nil, err
	}

	return story, nil
}

// CreateImageStory is the resolver for the createImageStory field.
func (r *mutationResolver) CreateImageStory(ctx context.Context, input model.NewImageStory) (*model.Story, error) {
	userID := ctx.Value("UserID").(string)

	story := &model.Story{
		ID:        uuid.NewString(),
		UserID:    userID,
		Image:     &input.Image,
		CreatedAt: time.Now(),
	}

	if err := r.DB.Save(&story).Error; err != nil {
		return nil, err
	}

	return story, nil
}

// GetStories is the resolver for the getStories field.
func (r *queryResolver) GetStories(ctx context.Context, username string) ([]*model.Story, error) {
	var stories []*model.Story
	var user *model.User

	if err := r.DB.First(&user, "username = ?", username).Error; err != nil {
		return nil, err
	}

	if err := r.DB.Find(&stories, "user_id = ? AND DATE_PART('day', ? - created_at) = 0", user.ID, time.Now()).Error; err != nil {
		return nil, err
	}

	return stories, nil
}

// GetUserWithStories is the resolver for the getUserWithStories field.
func (r *queryResolver) GetUserWithStories(ctx context.Context) ([]*model.User, error) {
	userID := ctx.Value("UserID").(string)

	// Retrieve user IDs from friends' records
	var friendIDs []string
	if err := r.DB.
		Model(&model.Friend{}).
		Where("sender_id = ? OR receiver_id = ?", userID, userID).
		Select("DISTINCT CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END", userID).
		Find(&friendIDs).Error; err != nil {
		return nil, err
	}

	fmt.Println(friendIDs)

	friendIDs = append(friendIDs, userID)

	var userIDs []string
	if err := r.DB.Model(&model.Story{}).Where("user_id IN (?) AND DATE_PART('day', ? - created_at) = 0", friendIDs, time.Now()).Select("user_id").Find(&userIDs).Error; err != nil {
		return nil, err
	}

	var users []*model.User
	if err := r.DB.Model(&model.User{}).Where("id IN (?)", userIDs).Find(&users).Error; err != nil {
		return nil, err
	}

	return users, nil
}

// User is the resolver for the user field.
func (r *storyResolver) User(ctx context.Context, obj *model.Story) (*model.User, error) {
	var user *model.User

	if err := r.DB.First(&user, "id = ?", obj.UserID).Error; err != nil {
		return nil, err
	}

	return user, nil
}

// Story returns graph.StoryResolver implementation.
func (r *Resolver) Story() graph.StoryResolver { return &storyResolver{r} }

type storyResolver struct{ *Resolver }
