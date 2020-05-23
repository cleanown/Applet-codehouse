# Applet-codehouse


// 因审核机制暂时取消的发布页(package.json)：
{
  "pagePath": "pages/release/release",
  "text": "发布",
  "iconPath": "./images/tabbar/addto.png",
  "selectedIconPath": "./images/tabbar/addto-s.png"
},


// 因审核机制暂时取消的评论功能(article.wxml '第28行' )：
  <!-- 底部 -->
  <view class="icon">
    <mp-icon class="icons" icon="star" color="{{starcolor}}" type="{{startype}}" size="25" bindtap="star"></mp-icon>
    <mp-icon icon="like" color="{{likecolor}}" type="{{liketype}}" size="25" bindtap="like"></mp-icon>
    <view class="icons">{{likenum}}</view>
    <mp-icon icon="comment" color="black" size="25" bindtap="comment"></mp-icon>
    <view class="icons" wx:if="commentnum>0">{{commentnum}}</view>
  </view>
  <!-- 评论输入框 -->
  <view class="input" wx:if="{{inputshow}}">
    <view class="input-down" bindtap="inputClose">
      <image class="input-down-img" src="../../images/arrow_down.png" mode="aspectFill"></image>
    </view>
    <textarea class="input-detail" fixed="true" focus="true" show-confirm-bar="{{false}}" placeholder="评论：" bindinput="commentValue" value="{{commentvalue}}"></textarea>
    <button class="input-btn" size="mini" hover-class="hover-class" bindtap="commentSent">发送</button>
  </view>
  <!-- 回复输入框 -->
  <view class="input" wx:if="{{replyshow}}">
    <view class="input-down" bindtap="inputClose">
      <image class="input-down-img" src="../../images/arrow_down.png" mode="aspectFill"></image>
    </view>
    <textarea class="input-detail" fixed="true" focus="true" show-confirm-bar="{{false}}" placeholder="@{{linkname}}:" bindinput="commentValue" value="{{commentvalue}}"></textarea>
    <button class="input-btn" size="mini" hover-class="hover-class" bindtap="commentSent">发送</button>
  </view>
  <!-- 评论内容 -->
  <view class="comment">
    <view class="comment-title">评论 :</view>
    <view wx:if="{{token == ''}}" class="token">
      <view>
        <view class="token-text">登录后查看评论</view>
        <button class="token-btn" hover-class="hover-class" bindtap="loginGo">登录</button>
      </view>
    </view>
    <view wx:else>
      <view wx:if="{{commentshow}}">
        <view class="comment-item" wx:for="{{comment}}" wx:key="index">
          <view class="comment-items">
            <view class="comment-items-user">
              <view class="comment-item-user-head">
                <image class="comment-item-user-head-img" src="{{item.userinfo.headimg}}"></image>
              </view>
              <view class="comment-item-user-name">{{item.userinfo.username}}</view>
            </view>
            <view class="comment-detail" style="font-weight: bolder">
              {{item.commentdetail}}
            </view>
            <view class="comment-last" style="margin-bottom: 30px;">
              <view class="comment-last-set">
                <view class="comment-last-set-reply" bindtap="reply" data-commentid="{{item._id}}" data-linkid="{{item.userinfo._id}}" data-linkname="{{item.userinfo.username}}">回复</view>
                <view class="comment-last-set-delete">删除</view>
              </view>
              <view class="comment-last-time">评论时间：{{filter.dateFormatStr(item.meta.createAt)}}</view>
            </view>
            <!-- 子评论，回复 -->
            <view style="border-top: 1px dotted #ccc;padding:20px;" wx:for="{{item.children}}" wx:for-item="children" wx:key="index" wx:if="item.children.length>0" >
              <view class="comment-items">
                <view class="comment-items-user">
                  <view class="comment-item-user-head">
                    <image class="comment-item-user-head-img" src="{{children.userinfo.headimg}}"></image>
                  </view>
                  <view class="comment-item-user-name" style="color: #999">{{children.userinfo.username}}</view>
                </view>
                <view class="comment-detail">
                  <view wx:if="{{item.userid!==children.linkid}}" style="float: left;color: #B388FF;">@{{children.linkname}}</view>
                  <view>
                    {{children.commentdetail}}
                  </view>
                </view>
                <view class="comment-last">
                  <view class="comment-last-set">
                    <view class="comment-last-set-reply" bindtap="childrenReply" data-commentid="{{item._id}}" data-linkid="{{children.userinfo._id}}" data-linkname="{{children.userinfo.username}}">回复</view>
                    <view class="comment-last-set-delete">删除</view>
                  </view>
                  <view class="comment-last-time">评论时间：{{filter.dateFormatStr(children.meta.createAt)}}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view wx:if="{{!commentshow}}" class="comment-none">暂无评论！</view>
    </view>
  </view>