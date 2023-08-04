package directives

import (
	"context"
	"fmt"
	"github.com/99designs/gqlgen/graphql"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"github.com/yahkerobertkertasnya/TPAWebBack/database"
	"github.com/yahkerobertkertasnya/TPAWebBack/graph/model"
	"github.com/yahkerobertkertasnya/TPAWebBack/helper"
)

func AuthDirectives(ctx context.Context, next graphql.Resolver) (res interface{}, err error) {
	token := ctx.Value("token")

	if token == nil {
		return nil, &gqlerror.Error{
			Message: "Permission denied",
		}
	}

	claims, err := helper.ParseJWT(token.(string))

	if err != nil {
		return nil, &gqlerror.Error{
			Message: err.Error(),
		}
	}

	userId := claims

	fmt.Println(userId)
	DB := database.GetInstance()

	if err := DB.First(&model.User{}, "id = ?", userId).Error; err != nil {
		return nil, err
	}

	ctx = context.WithValue(ctx, "UserID", userId)

	return next(ctx)
}
