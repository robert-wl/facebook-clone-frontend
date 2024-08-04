/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation acceptFriend($friend: ID!) {\n    acceptFriend(friend: $friend) {\n      accepted\n    }\n  }\n": types.AcceptFriendDocument,
    "\n  mutation addFriend($friendInput: FriendInput!) {\n    addFriend(friendInput: $friendInput) {\n      sender {\n        username\n      }\n      receiver {\n        username\n      }\n      accepted\n    }\n  }\n": types.AddFriendDocument,
    "\n  query getFriendRequests {\n    getFriendRequests {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n    }\n  }\n": types.GetFriendRequestsDocument,
    "\n  query getFriends {\n    getFriends {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n": types.GetFriendsDocument,
    "\n  query getPeopleMightKnow {\n    getPeopleMightKnow {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      profile\n      active\n    }\n  }\n": types.GetPeopleMightKnowDocument,
    "\n  query getUserFriends($username: String!) {\n    getUserFriends(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n": types.GetUserFriendsDocument,
    "\n  query getUserMutuals($username: String!) {\n    getUserMutuals(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n": types.GetUserMutualsDocument,
    "\n  mutation rejectFriend($friend: ID!) {\n    rejectFriend(friend: $friend) {\n      accepted\n    }\n  }\n": types.RejectFriendDocument,
    "\n  mutation approveMember($groupId: ID!, $userId: ID!) {\n    approveMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n": types.ApproveMemberDocument,
    "\n  mutation createGroup($group: NewGroup!) {\n    createGroup(group: $group) {\n      id\n      name\n      about\n      privacy\n      background\n      members {\n        user {\n          firstName\n          lastName\n          username\n        }\n        approved\n        role\n      }\n      chat {\n        id\n      }\n    }\n  }\n": types.CreateGroupDocument,
    "\n  mutation deleteFile($id: ID!) {\n    deleteFile(fileId: $id)\n  }\n": types.DeleteFileDocument,
    "\n  mutation denyMember($groupId: ID!, $userId: ID!) {\n    denyMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n": types.DenyMemberDocument,
    "\n  query getGroup($id: ID!) {\n    getGroup(id: $id) {\n      id\n      name\n      about\n      privacy\n      background\n      isAdmin\n      joined\n      posts {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n          email\n          gender\n          dob\n        }\n        content\n        privacy\n        likeCount\n        commentCount\n        shareCount\n        liked\n        comments {\n          id\n          content\n        }\n        files\n        createdAt\n      }\n      members {\n        user {\n          id\n          firstName\n          lastName\n          username\n          profile\n        }\n        approved\n        requested\n        role\n      }\n      memberCount\n      chat {\n        id\n      }\n    }\n  }\n": types.GetGroupDocument,
    "\n  query getGroupFiles($id: ID!) {\n    getGroupFiles(groupId: $id) {\n      id\n      name\n      type\n      url\n      uploadedBy {\n        firstName\n        lastName\n        username\n      }\n      uploadedAt\n    }\n  }\n": types.GetGroupFilesDocument,
    "\n  query getGroupHomePosts($pagination: Pagination!) {\n    getGroupHomePosts(pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n": types.GetGroupHomePostsDocument,
    "\n  query getGroupInvite($id: ID!) {\n    getGroupInvite(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      profile\n    }\n  }\n": types.GetGroupInviteDocument,
    "\n  query getGroupPosts($group: ID!, $pagination: Pagination!) {\n    getGroupPosts(groupId: $group, pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n": types.GetGroupPostsDocument,
    "\n  query getGroups {\n    getGroups {\n      id\n      name\n      about\n      privacy\n      background\n      members {\n        user {\n          firstName\n          lastName\n          username\n        }\n        approved\n        role\n      }\n      memberCount\n      joined\n      chat {\n        id\n      }\n    }\n  }\n": types.GetGroupsDocument,
    "\n  query getJoinRequests($id: ID!) {\n    getJoinRequests(groupId: $id) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n    }\n  }\n": types.GetJoinRequestsDocument,
    "\n  query getJoinedGroups {\n    getJoinedGroups {\n      id\n      name\n      about\n      privacy\n      chat {\n        id\n      }\n      background\n    }\n  }\n": types.GetJoinedGroupsDocument,
    "\n  mutation handleRequest($id: ID!) {\n    handleRequest(groupId: $id) {\n      approved\n      role\n    }\n  }\n": types.HandleRequestDocument,
    "\n  mutation inviteToGroup($groupId: ID!, $userId: ID!) {\n    inviteToGroup(groupId: $groupId, userId: $userId) {\n      approved\n      role\n    }\n  }\n": types.InviteToGroupDocument,
    "\n  mutation kickMember($groupId: ID!, $userId: ID!) {\n    kickMember(groupId: $groupId, userId: $userId)\n  }\n": types.KickMemberDocument,
    "\n  mutation leaveGroup($group: ID!) {\n    leaveGroup(groupId: $group)\n  }\n": types.LeaveGroupDocument,
    "\n  mutation promoteMember($groupId: ID!, $userId: ID!) {\n    promoteMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n": types.PromoteMemberDocument,
    "\n  mutation updateGroupBackground($id: ID!, $background: String!) {\n    updateGroupBackground(groupId: $id, background: $background) {\n      background\n    }\n  }\n": types.UpdateGroupBackgroundDocument,
    "\n  mutation uploadFile($id: ID!, $file: NewGroupFile!) {\n    uploadFile(groupId: $id, file: $file) {\n      id\n      name\n      type\n      url\n      uploadedBy {\n        firstName\n        lastName\n        username\n      }\n      uploadedAt\n    }\n  }\n": types.UploadFileDocument,
    "\n  mutation createConversation($username: String!) {\n    createConversation(username: $username) {\n      id\n    }\n  }\n": types.CreateConversationDocument,
    "\n  query getConversations {\n    getConversations {\n      id\n      users {\n        user {\n          id\n          firstName\n          lastName\n          username\n          profile\n        }\n      }\n      group {\n        name\n        background\n        members {\n          user {\n            firstName\n            lastName\n            username\n          }\n          approved\n          role\n        }\n      }\n      messages {\n        message\n      }\n    }\n  }\n": types.GetConversationsDocument,
    "\n  mutation sendMessage($convID: ID!, $message: String, $image: String, $post: ID) {\n    sendMessage(conversationID: $convID, message: $message, image: $image, postID: $post) {\n      id\n      message\n      image\n    }\n  }\n": types.SendMessageDocument,
    "\n  subscription viewConversation($conversation: ID!) {\n    viewConversation(conversationID: $conversation) {\n      sender {\n        firstName\n        lastName\n        username\n      }\n      message\n      image\n      post {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n        }\n        content\n        files\n      }\n      createdAt\n    }\n  }\n": types.ViewConversationDocument,
    "\n  mutation blockUser($username: String!) {\n    blockUser(username: $username) {\n      receiver {\n        firstName\n        lastName\n      }\n    }\n  }\n": types.BlockUserDocument,
    "\n  query getNotifications {\n    getNotifications {\n      id\n      message\n      sender {\n        firstName\n        lastName\n        profile\n        username\n      }\n      createdAt\n      postId\n      reelId\n      groupId\n      storyId\n    }\n  }\n": types.GetNotificationsDocument,
    "\n  mutation getUnreadNotifications {\n    getUnreadNotifications {\n      id\n      message\n      sender {\n        username\n        firstName\n        lastName\n        profile\n      }\n      createdAt\n      postId\n      reelId\n      groupId\n      storyId\n    }\n  }\n": types.GetUnreadNotificationsDocument,
    "\n  mutation createComment($newComment: NewComment!) {\n    createComment(newComment: $newComment) {\n      id\n      content\n      liked\n      likeCount\n      user {\n        firstName\n        lastName\n        profile\n        username\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation createPost($post: NewPost!) {\n    createPost(newPost: $post) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      postTags {\n        user {\n          firstName\n          lastName\n          createdAt\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n": types.CreatePostDocument,
    "\n  mutation deletePost($id: ID!) {\n    deletePost(postID: $id)\n  }\n": types.DeletePostDocument,
    "\n  query getCommentPost($postId: ID!) {\n    getCommentPost(postID: $postId) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      liked\n      likeCount\n      comments {\n        id\n        content\n        liked\n        likeCount\n        user {\n          firstName\n          lastName\n          username\n          profile\n          email\n          gender\n          dob\n        }\n        createdAt\n      }\n      createdAt\n    }\n  }\n": types.GetCommentPostDocument,
    "\n  query getPosts($pagination: Pagination!) {\n    getPosts(pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n": types.GetPostsDocument,
    "\n  mutation likeComment($id: ID!) {\n    likecomment(commentID: $id) {\n      commentId\n    }\n  }\n": types.LikeCommentDocument,
    "\n  mutation likePost($id: ID!) {\n    likePost(postID: $id) {\n      postId\n    }\n  }\n": types.LikePostDocument,
    "\n  mutation sharePost($user: ID!, $post: ID!) {\n    sharePost(userID: $user, postID: $post)\n  }\n": types.SharePostDocument,
    "\n  mutation createReel($reel: NewReel!) {\n    createReel(reel: $reel) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      content\n      video\n      likeCount\n    }\n  }\n": types.CreateReelDocument,
    "\n  mutation createReelComment($comment: NewReelComment!) {\n    createReelComment(comment: $comment) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      likeCount\n      replyCount\n    }\n  }\n": types.CreateReelCommentDocument,
    "\n  query getReel($id: ID!) {\n    getReel(id: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      shareCount\n      likeCount\n      commentCount\n      liked\n      video\n    }\n  }\n": types.GetReelDocument,
    "\n  query getReelComments($id: ID!) {\n    getReelComments(reelId: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      likeCount\n      replyCount\n      liked\n      comments {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n        }\n        content\n        likeCount\n        replyCount\n        liked\n      }\n    }\n  }\n": types.GetReelCommentsDocument,
    "\n  query getReels {\n    getReels\n  }\n": types.GetReelsDocument,
    "\n  query getReelsPaginated($pagination: Pagination!) {\n    getReelsPaginated(pagination: $pagination) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      shareCount\n      likeCount\n      commentCount\n      liked\n      video\n    }\n  }\n": types.GetReelsPaginatedDocument,
    "\n  mutation likeReel($reel: ID!) {\n    likeReel(reelId: $reel) {\n      reelId\n    }\n  }\n": types.LikeReelDocument,
    "\n  mutation likeReelComment($id: ID!) {\n    likeReelComment(reelCommentId: $id) {\n      reelCommentId\n    }\n  }\n": types.LikeReelCommentDocument,
    "\n  query getFilteredGroups($filter: String!, $pagination: Pagination!) {\n    getFilteredGroups(filter: $filter, pagination: $pagination) {\n      id\n      name\n      about\n      background\n      joined\n      privacy\n      memberCount\n    }\n  }\n": types.GetFilteredGroupsDocument,
    "\n  query getFilteredPosts($filter: String!, $pagination: Pagination!) {\n    getFilteredPosts(filter: $filter, pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n": types.GetFilteredPostsDocument,
    "\n  query getFilteredUsers($filter: String!, $pagination: Pagination!) {\n    getFilteredUsers(filter: $filter, pagination: $pagination) {\n      id\n      firstName\n      lastName\n      username\n      profile\n      friended\n    }\n  }\n": types.GetFilteredUsersDocument,
    "\n  mutation createImageStory($story: NewImageStory!) {\n    createImageStory(input: $story) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      text\n    }\n  }\n": types.CreateImageStoryDocument,
    "\n  mutation createTextStory($story: NewTextStory!) {\n    createTextStory(input: $story) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      text\n    }\n  }\n": types.CreateTextStoryDocument,
    "\n  query getStories($username: String!) {\n    getStories(username: $username) {\n      id\n      image\n      text\n      font\n      color\n    }\n  }\n": types.GetStoriesDocument,
    "\n  query GetUserWithStories {\n    getUserWithStories {\n      id\n      firstName\n      lastName\n      username\n      profile\n    }\n  }\n": types.GetUserWithStoriesDocument,
    "\n  mutation activateUser($id: String!) {\n    activateUser(id: $id) {\n      id\n    }\n  }\n": types.ActivateUserDocument,
    "\n  mutation authenticateUser($email: String!, $password: String!) {\n    authenticateUser(email: $email, password: $password)\n  }\n": types.AuthenticateUserDocument,
    "\n  query checkActivateLink($id: String!) {\n    checkActivateLink(id: $id)\n  }\n": types.CheckActivateLinkDocument,
    "\n  query checkResetLink($id: String!) {\n    checkResetLink(id: $id)\n  }\n": types.CheckResetLinkDocument,
    "\n  mutation createUser($user: NewUser!) {\n    createUser(input: $user) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n": types.ForgotPasswordDocument,
    "\n  query getRandomUsers($amount: Int!) {\n    getRandomUsers(amount: $amount) {\n      id\n      firstName\n      lastName\n      username\n      email\n    }\n  }\n": types.GetRandomUsersDocument,
    "\n  query getUser($username: String!) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n      background\n      friended\n      friendCount\n      mutualCount\n      blocked\n      posts {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n          dob\n          gender\n          email\n        }\n        content\n        privacy\n        likeCount\n        commentCount\n        shareCount\n        liked\n        files\n        createdAt\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  query getUsers {\n    getUsers {\n      id\n      firstName\n      lastName\n      username\n    }\n  }\n": types.GetUsersDocument,
    "\n  mutation resetPassword($id: String!, $password: String!) {\n    resetPassword(id: $id, password: $password) {\n      id\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation updateTheme($theme: String!) {\n    updateTheme(theme: $theme) {\n      theme\n    }\n  }\n": types.UpdateThemeDocument,
    "\n  mutation updateUser($updateUser: UpdateUser!) {\n    updateUser(input: $updateUser) {\n      id\n    }\n  }\n": types.UpdateUserDocument,
    "\n  mutation updateUserBackground($background: String!) {\n    updateUserBackground(background: $background) {\n      id\n    }\n  }\n": types.UpdateUserBackgroundDocument,
    "\n  mutation updateUserProfile($profile: String!) {\n    updateUserProfile(profile: $profile) {\n      id\n    }\n  }\n": types.UpdateUserProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation acceptFriend($friend: ID!) {\n    acceptFriend(friend: $friend) {\n      accepted\n    }\n  }\n"): (typeof documents)["\n  mutation acceptFriend($friend: ID!) {\n    acceptFriend(friend: $friend) {\n      accepted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addFriend($friendInput: FriendInput!) {\n    addFriend(friendInput: $friendInput) {\n      sender {\n        username\n      }\n      receiver {\n        username\n      }\n      accepted\n    }\n  }\n"): (typeof documents)["\n  mutation addFriend($friendInput: FriendInput!) {\n    addFriend(friendInput: $friendInput) {\n      sender {\n        username\n      }\n      receiver {\n        username\n      }\n      accepted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFriendRequests {\n    getFriendRequests {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n    }\n  }\n"): (typeof documents)["\n  query getFriendRequests {\n    getFriendRequests {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFriends {\n    getFriends {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n"): (typeof documents)["\n  query getFriends {\n    getFriends {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPeopleMightKnow {\n    getPeopleMightKnow {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      profile\n      active\n    }\n  }\n"): (typeof documents)["\n  query getPeopleMightKnow {\n    getPeopleMightKnow {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      profile\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserFriends($username: String!) {\n    getUserFriends(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n"): (typeof documents)["\n  query getUserFriends($username: String!) {\n    getUserFriends(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUserMutuals($username: String!) {\n    getUserMutuals(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n"): (typeof documents)["\n  query getUserMutuals($username: String!) {\n    getUserMutuals(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation rejectFriend($friend: ID!) {\n    rejectFriend(friend: $friend) {\n      accepted\n    }\n  }\n"): (typeof documents)["\n  mutation rejectFriend($friend: ID!) {\n    rejectFriend(friend: $friend) {\n      accepted\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation approveMember($groupId: ID!, $userId: ID!) {\n    approveMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n"): (typeof documents)["\n  mutation approveMember($groupId: ID!, $userId: ID!) {\n    approveMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createGroup($group: NewGroup!) {\n    createGroup(group: $group) {\n      id\n      name\n      about\n      privacy\n      background\n      members {\n        user {\n          firstName\n          lastName\n          username\n        }\n        approved\n        role\n      }\n      chat {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createGroup($group: NewGroup!) {\n    createGroup(group: $group) {\n      id\n      name\n      about\n      privacy\n      background\n      members {\n        user {\n          firstName\n          lastName\n          username\n        }\n        approved\n        role\n      }\n      chat {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteFile($id: ID!) {\n    deleteFile(fileId: $id)\n  }\n"): (typeof documents)["\n  mutation deleteFile($id: ID!) {\n    deleteFile(fileId: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation denyMember($groupId: ID!, $userId: ID!) {\n    denyMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n"): (typeof documents)["\n  mutation denyMember($groupId: ID!, $userId: ID!) {\n    denyMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGroup($id: ID!) {\n    getGroup(id: $id) {\n      id\n      name\n      about\n      privacy\n      background\n      isAdmin\n      joined\n      posts {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n          email\n          gender\n          dob\n        }\n        content\n        privacy\n        likeCount\n        commentCount\n        shareCount\n        liked\n        comments {\n          id\n          content\n        }\n        files\n        createdAt\n      }\n      members {\n        user {\n          id\n          firstName\n          lastName\n          username\n          profile\n        }\n        approved\n        requested\n        role\n      }\n      memberCount\n      chat {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query getGroup($id: ID!) {\n    getGroup(id: $id) {\n      id\n      name\n      about\n      privacy\n      background\n      isAdmin\n      joined\n      posts {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n          email\n          gender\n          dob\n        }\n        content\n        privacy\n        likeCount\n        commentCount\n        shareCount\n        liked\n        comments {\n          id\n          content\n        }\n        files\n        createdAt\n      }\n      members {\n        user {\n          id\n          firstName\n          lastName\n          username\n          profile\n        }\n        approved\n        requested\n        role\n      }\n      memberCount\n      chat {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGroupFiles($id: ID!) {\n    getGroupFiles(groupId: $id) {\n      id\n      name\n      type\n      url\n      uploadedBy {\n        firstName\n        lastName\n        username\n      }\n      uploadedAt\n    }\n  }\n"): (typeof documents)["\n  query getGroupFiles($id: ID!) {\n    getGroupFiles(groupId: $id) {\n      id\n      name\n      type\n      url\n      uploadedBy {\n        firstName\n        lastName\n        username\n      }\n      uploadedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGroupHomePosts($pagination: Pagination!) {\n    getGroupHomePosts(pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getGroupHomePosts($pagination: Pagination!) {\n    getGroupHomePosts(pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGroupInvite($id: ID!) {\n    getGroupInvite(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      profile\n    }\n  }\n"): (typeof documents)["\n  query getGroupInvite($id: ID!) {\n    getGroupInvite(id: $id) {\n      id\n      firstName\n      lastName\n      username\n      profile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGroupPosts($group: ID!, $pagination: Pagination!) {\n    getGroupPosts(groupId: $group, pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getGroupPosts($group: ID!, $pagination: Pagination!) {\n    getGroupPosts(groupId: $group, pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getGroups {\n    getGroups {\n      id\n      name\n      about\n      privacy\n      background\n      members {\n        user {\n          firstName\n          lastName\n          username\n        }\n        approved\n        role\n      }\n      memberCount\n      joined\n      chat {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query getGroups {\n    getGroups {\n      id\n      name\n      about\n      privacy\n      background\n      members {\n        user {\n          firstName\n          lastName\n          username\n        }\n        approved\n        role\n      }\n      memberCount\n      joined\n      chat {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getJoinRequests($id: ID!) {\n    getJoinRequests(groupId: $id) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n    }\n  }\n"): (typeof documents)["\n  query getJoinRequests($id: ID!) {\n    getJoinRequests(groupId: $id) {\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getJoinedGroups {\n    getJoinedGroups {\n      id\n      name\n      about\n      privacy\n      chat {\n        id\n      }\n      background\n    }\n  }\n"): (typeof documents)["\n  query getJoinedGroups {\n    getJoinedGroups {\n      id\n      name\n      about\n      privacy\n      chat {\n        id\n      }\n      background\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation handleRequest($id: ID!) {\n    handleRequest(groupId: $id) {\n      approved\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation handleRequest($id: ID!) {\n    handleRequest(groupId: $id) {\n      approved\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation inviteToGroup($groupId: ID!, $userId: ID!) {\n    inviteToGroup(groupId: $groupId, userId: $userId) {\n      approved\n      role\n    }\n  }\n"): (typeof documents)["\n  mutation inviteToGroup($groupId: ID!, $userId: ID!) {\n    inviteToGroup(groupId: $groupId, userId: $userId) {\n      approved\n      role\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation kickMember($groupId: ID!, $userId: ID!) {\n    kickMember(groupId: $groupId, userId: $userId)\n  }\n"): (typeof documents)["\n  mutation kickMember($groupId: ID!, $userId: ID!) {\n    kickMember(groupId: $groupId, userId: $userId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation leaveGroup($group: ID!) {\n    leaveGroup(groupId: $group)\n  }\n"): (typeof documents)["\n  mutation leaveGroup($group: ID!) {\n    leaveGroup(groupId: $group)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation promoteMember($groupId: ID!, $userId: ID!) {\n    promoteMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n"): (typeof documents)["\n  mutation promoteMember($groupId: ID!, $userId: ID!) {\n    promoteMember(groupId: $groupId, userId: $userId) {\n      approved\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateGroupBackground($id: ID!, $background: String!) {\n    updateGroupBackground(groupId: $id, background: $background) {\n      background\n    }\n  }\n"): (typeof documents)["\n  mutation updateGroupBackground($id: ID!, $background: String!) {\n    updateGroupBackground(groupId: $id, background: $background) {\n      background\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadFile($id: ID!, $file: NewGroupFile!) {\n    uploadFile(groupId: $id, file: $file) {\n      id\n      name\n      type\n      url\n      uploadedBy {\n        firstName\n        lastName\n        username\n      }\n      uploadedAt\n    }\n  }\n"): (typeof documents)["\n  mutation uploadFile($id: ID!, $file: NewGroupFile!) {\n    uploadFile(groupId: $id, file: $file) {\n      id\n      name\n      type\n      url\n      uploadedBy {\n        firstName\n        lastName\n        username\n      }\n      uploadedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createConversation($username: String!) {\n    createConversation(username: $username) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation createConversation($username: String!) {\n    createConversation(username: $username) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getConversations {\n    getConversations {\n      id\n      users {\n        user {\n          id\n          firstName\n          lastName\n          username\n          profile\n        }\n      }\n      group {\n        name\n        background\n        members {\n          user {\n            firstName\n            lastName\n            username\n          }\n          approved\n          role\n        }\n      }\n      messages {\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  query getConversations {\n    getConversations {\n      id\n      users {\n        user {\n          id\n          firstName\n          lastName\n          username\n          profile\n        }\n      }\n      group {\n        name\n        background\n        members {\n          user {\n            firstName\n            lastName\n            username\n          }\n          approved\n          role\n        }\n      }\n      messages {\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sendMessage($convID: ID!, $message: String, $image: String, $post: ID) {\n    sendMessage(conversationID: $convID, message: $message, image: $image, postID: $post) {\n      id\n      message\n      image\n    }\n  }\n"): (typeof documents)["\n  mutation sendMessage($convID: ID!, $message: String, $image: String, $post: ID) {\n    sendMessage(conversationID: $convID, message: $message, image: $image, postID: $post) {\n      id\n      message\n      image\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription viewConversation($conversation: ID!) {\n    viewConversation(conversationID: $conversation) {\n      sender {\n        firstName\n        lastName\n        username\n      }\n      message\n      image\n      post {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n        }\n        content\n        files\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  subscription viewConversation($conversation: ID!) {\n    viewConversation(conversationID: $conversation) {\n      sender {\n        firstName\n        lastName\n        username\n      }\n      message\n      image\n      post {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n        }\n        content\n        files\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation blockUser($username: String!) {\n    blockUser(username: $username) {\n      receiver {\n        firstName\n        lastName\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation blockUser($username: String!) {\n    blockUser(username: $username) {\n      receiver {\n        firstName\n        lastName\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getNotifications {\n    getNotifications {\n      id\n      message\n      sender {\n        firstName\n        lastName\n        profile\n        username\n      }\n      createdAt\n      postId\n      reelId\n      groupId\n      storyId\n    }\n  }\n"): (typeof documents)["\n  query getNotifications {\n    getNotifications {\n      id\n      message\n      sender {\n        firstName\n        lastName\n        profile\n        username\n      }\n      createdAt\n      postId\n      reelId\n      groupId\n      storyId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation getUnreadNotifications {\n    getUnreadNotifications {\n      id\n      message\n      sender {\n        username\n        firstName\n        lastName\n        profile\n      }\n      createdAt\n      postId\n      reelId\n      groupId\n      storyId\n    }\n  }\n"): (typeof documents)["\n  mutation getUnreadNotifications {\n    getUnreadNotifications {\n      id\n      message\n      sender {\n        username\n        firstName\n        lastName\n        profile\n      }\n      createdAt\n      postId\n      reelId\n      groupId\n      storyId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($newComment: NewComment!) {\n    createComment(newComment: $newComment) {\n      id\n      content\n      liked\n      likeCount\n      user {\n        firstName\n        lastName\n        profile\n        username\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($newComment: NewComment!) {\n    createComment(newComment: $newComment) {\n      id\n      content\n      liked\n      likeCount\n      user {\n        firstName\n        lastName\n        profile\n        username\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createPost($post: NewPost!) {\n    createPost(newPost: $post) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      postTags {\n        user {\n          firstName\n          lastName\n          createdAt\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation createPost($post: NewPost!) {\n    createPost(newPost: $post) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      postTags {\n        user {\n          firstName\n          lastName\n          createdAt\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePost($id: ID!) {\n    deletePost(postID: $id)\n  }\n"): (typeof documents)["\n  mutation deletePost($id: ID!) {\n    deletePost(postID: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getCommentPost($postId: ID!) {\n    getCommentPost(postID: $postId) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      liked\n      likeCount\n      comments {\n        id\n        content\n        liked\n        likeCount\n        user {\n          firstName\n          lastName\n          username\n          profile\n          email\n          gender\n          dob\n        }\n        createdAt\n      }\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getCommentPost($postId: ID!) {\n    getCommentPost(postID: $postId) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      liked\n      likeCount\n      comments {\n        id\n        content\n        liked\n        likeCount\n        user {\n          firstName\n          lastName\n          username\n          profile\n          email\n          gender\n          dob\n        }\n        createdAt\n      }\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getPosts($pagination: Pagination!) {\n    getPosts(pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getPosts($pagination: Pagination!) {\n    getPosts(pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeComment($id: ID!) {\n    likecomment(commentID: $id) {\n      commentId\n    }\n  }\n"): (typeof documents)["\n  mutation likeComment($id: ID!) {\n    likecomment(commentID: $id) {\n      commentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likePost($id: ID!) {\n    likePost(postID: $id) {\n      postId\n    }\n  }\n"): (typeof documents)["\n  mutation likePost($id: ID!) {\n    likePost(postID: $id) {\n      postId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation sharePost($user: ID!, $post: ID!) {\n    sharePost(userID: $user, postID: $post)\n  }\n"): (typeof documents)["\n  mutation sharePost($user: ID!, $post: ID!) {\n    sharePost(userID: $user, postID: $post)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createReel($reel: NewReel!) {\n    createReel(reel: $reel) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      content\n      video\n      likeCount\n    }\n  }\n"): (typeof documents)["\n  mutation createReel($reel: NewReel!) {\n    createReel(reel: $reel) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      content\n      video\n      likeCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createReelComment($comment: NewReelComment!) {\n    createReelComment(comment: $comment) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      likeCount\n      replyCount\n    }\n  }\n"): (typeof documents)["\n  mutation createReelComment($comment: NewReelComment!) {\n    createReelComment(comment: $comment) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      likeCount\n      replyCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getReel($id: ID!) {\n    getReel(id: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      shareCount\n      likeCount\n      commentCount\n      liked\n      video\n    }\n  }\n"): (typeof documents)["\n  query getReel($id: ID!) {\n    getReel(id: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      shareCount\n      likeCount\n      commentCount\n      liked\n      video\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getReelComments($id: ID!) {\n    getReelComments(reelId: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      likeCount\n      replyCount\n      liked\n      comments {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n        }\n        content\n        likeCount\n        replyCount\n        liked\n      }\n    }\n  }\n"): (typeof documents)["\n  query getReelComments($id: ID!) {\n    getReelComments(reelId: $id) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      likeCount\n      replyCount\n      liked\n      comments {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n        }\n        content\n        likeCount\n        replyCount\n        liked\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getReels {\n    getReels\n  }\n"): (typeof documents)["\n  query getReels {\n    getReels\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getReelsPaginated($pagination: Pagination!) {\n    getReelsPaginated(pagination: $pagination) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      shareCount\n      likeCount\n      commentCount\n      liked\n      video\n    }\n  }\n"): (typeof documents)["\n  query getReelsPaginated($pagination: Pagination!) {\n    getReelsPaginated(pagination: $pagination) {\n      id\n      user {\n        id\n        firstName\n        lastName\n        username\n        profile\n      }\n      content\n      shareCount\n      likeCount\n      commentCount\n      liked\n      video\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeReel($reel: ID!) {\n    likeReel(reelId: $reel) {\n      reelId\n    }\n  }\n"): (typeof documents)["\n  mutation likeReel($reel: ID!) {\n    likeReel(reelId: $reel) {\n      reelId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation likeReelComment($id: ID!) {\n    likeReelComment(reelCommentId: $id) {\n      reelCommentId\n    }\n  }\n"): (typeof documents)["\n  mutation likeReelComment($id: ID!) {\n    likeReelComment(reelCommentId: $id) {\n      reelCommentId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFilteredGroups($filter: String!, $pagination: Pagination!) {\n    getFilteredGroups(filter: $filter, pagination: $pagination) {\n      id\n      name\n      about\n      background\n      joined\n      privacy\n      memberCount\n    }\n  }\n"): (typeof documents)["\n  query getFilteredGroups($filter: String!, $pagination: Pagination!) {\n    getFilteredGroups(filter: $filter, pagination: $pagination) {\n      id\n      name\n      about\n      background\n      joined\n      privacy\n      memberCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFilteredPosts($filter: String!, $pagination: Pagination!) {\n    getFilteredPosts(filter: $filter, pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query getFilteredPosts($filter: String!, $pagination: Pagination!) {\n    getFilteredPosts(filter: $filter, pagination: $pagination) {\n      id\n      user {\n        firstName\n        lastName\n        username\n        profile\n        email\n        gender\n        dob\n      }\n      content\n      privacy\n      likeCount\n      commentCount\n      shareCount\n      liked\n      group {\n        id\n        name\n        about\n        privacy\n        background\n        isAdmin\n        joined\n      }\n      postTags {\n        user {\n          firstName\n          lastName\n        }\n      }\n      comments {\n        id\n        content\n      }\n      files\n      createdAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getFilteredUsers($filter: String!, $pagination: Pagination!) {\n    getFilteredUsers(filter: $filter, pagination: $pagination) {\n      id\n      firstName\n      lastName\n      username\n      profile\n      friended\n    }\n  }\n"): (typeof documents)["\n  query getFilteredUsers($filter: String!, $pagination: Pagination!) {\n    getFilteredUsers(filter: $filter, pagination: $pagination) {\n      id\n      firstName\n      lastName\n      username\n      profile\n      friended\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createImageStory($story: NewImageStory!) {\n    createImageStory(input: $story) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      text\n    }\n  }\n"): (typeof documents)["\n  mutation createImageStory($story: NewImageStory!) {\n    createImageStory(input: $story) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      text\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createTextStory($story: NewTextStory!) {\n    createTextStory(input: $story) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      text\n    }\n  }\n"): (typeof documents)["\n  mutation createTextStory($story: NewTextStory!) {\n    createTextStory(input: $story) {\n      id\n      user {\n        firstName\n        lastName\n        username\n      }\n      text\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getStories($username: String!) {\n    getStories(username: $username) {\n      id\n      image\n      text\n      font\n      color\n    }\n  }\n"): (typeof documents)["\n  query getStories($username: String!) {\n    getStories(username: $username) {\n      id\n      image\n      text\n      font\n      color\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserWithStories {\n    getUserWithStories {\n      id\n      firstName\n      lastName\n      username\n      profile\n    }\n  }\n"): (typeof documents)["\n  query GetUserWithStories {\n    getUserWithStories {\n      id\n      firstName\n      lastName\n      username\n      profile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation activateUser($id: String!) {\n    activateUser(id: $id) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation activateUser($id: String!) {\n    activateUser(id: $id) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation authenticateUser($email: String!, $password: String!) {\n    authenticateUser(email: $email, password: $password)\n  }\n"): (typeof documents)["\n  mutation authenticateUser($email: String!, $password: String!) {\n    authenticateUser(email: $email, password: $password)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query checkActivateLink($id: String!) {\n    checkActivateLink(id: $id)\n  }\n"): (typeof documents)["\n  query checkActivateLink($id: String!) {\n    checkActivateLink(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query checkResetLink($id: String!) {\n    checkResetLink(id: $id)\n  }\n"): (typeof documents)["\n  query checkResetLink($id: String!) {\n    checkResetLink(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createUser($user: NewUser!) {\n    createUser(input: $user) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n    }\n  }\n"): (typeof documents)["\n  mutation createUser($user: NewUser!) {\n    createUser(input: $user) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"): (typeof documents)["\n  mutation forgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getRandomUsers($amount: Int!) {\n    getRandomUsers(amount: $amount) {\n      id\n      firstName\n      lastName\n      username\n      email\n    }\n  }\n"): (typeof documents)["\n  query getRandomUsers($amount: Int!) {\n    getRandomUsers(amount: $amount) {\n      id\n      firstName\n      lastName\n      username\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUser($username: String!) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n      background\n      friended\n      friendCount\n      mutualCount\n      blocked\n      posts {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n          dob\n          gender\n          email\n        }\n        content\n        privacy\n        likeCount\n        commentCount\n        shareCount\n        liked\n        files\n        createdAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query getUser($username: String!) {\n    getUser(username: $username) {\n      id\n      firstName\n      lastName\n      username\n      email\n      dob\n      gender\n      active\n      profile\n      background\n      friended\n      friendCount\n      mutualCount\n      blocked\n      posts {\n        id\n        user {\n          firstName\n          lastName\n          username\n          profile\n          dob\n          gender\n          email\n        }\n        content\n        privacy\n        likeCount\n        commentCount\n        shareCount\n        liked\n        files\n        createdAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query getUsers {\n    getUsers {\n      id\n      firstName\n      lastName\n      username\n    }\n  }\n"): (typeof documents)["\n  query getUsers {\n    getUsers {\n      id\n      firstName\n      lastName\n      username\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation resetPassword($id: String!, $password: String!) {\n    resetPassword(id: $id, password: $password) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation resetPassword($id: String!, $password: String!) {\n    resetPassword(id: $id, password: $password) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateTheme($theme: String!) {\n    updateTheme(theme: $theme) {\n      theme\n    }\n  }\n"): (typeof documents)["\n  mutation updateTheme($theme: String!) {\n    updateTheme(theme: $theme) {\n      theme\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($updateUser: UpdateUser!) {\n    updateUser(input: $updateUser) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($updateUser: UpdateUser!) {\n    updateUser(input: $updateUser) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUserBackground($background: String!) {\n    updateUserBackground(background: $background) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserBackground($background: String!) {\n    updateUserBackground(background: $background) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUserProfile($profile: String!) {\n    updateUserProfile(profile: $profile) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation updateUserProfile($profile: String!) {\n    updateUserProfile(profile: $profile) {\n      id\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;