---
title: Git Commands
date: 2022-09-21 16:00:10
tags:
---

### Git命令

专用名词
```
Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库
```

新建代码库

```git
# 在当前目录新建一个Git代码库
$ git init
```

```git
# 新建一个目录，将其初始化为Git代码库
$ git init [project-name]
```

```git
# 下载一个项目和它的整个代码历史
$ git clone [url]
```

配置

```git
# 显示当前的Git配置
$ git config --list
```

```git
# 编辑Git配置文件
$ git config -e [--global]
```

```git
# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

增加/删除文件

```git
# 添加指定文件到暂存区
$ git add [file1] [file2] ...
```

```git
# 添加指定目录到暂存区，包括子目录
$ git add [dir]
```

```git
# 添加当前目录的所有文件到暂存区
$ git add 
```

```git
# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...
```

```git
# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]
```

```git
# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```

代码提交

```git
# 提交暂存区到仓库区
$ git commit -m [message]
```

```git
# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]
```

```git
# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a
```

```git
# 提交时显示所有diff信息
$ git commit -v
```

```git
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
```

```git
# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend   ...
```

分支

```git
# 列出所有本地分支
$ git branch
```

```git
# 列出所有远程分支
$ git branch -r
```

```git
# 列出所有本地分支和远程分支
$ git branch -a
```

```git
# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]
```

```git
# 新建一个分支，并切换到该分支
$ git checkout -b [branch]
```

```git
# 新建一个分支，指向指定commit
$ git branch [branch] [commit]
```

```git
# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]
```

```git
# 切换到指定分支，并更新工作区
$ git checkout [branch-name]
```

```git
# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]
```

```git
# 合并指定分支到当前分支
$ git merge [branch]
```

```git
# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]
```

```git
# 删除分支
$ git branch -d [branch-name]
```

```git
# 删除远程分支
$ git push origin --delete 
$ git branch -dr 
```

标签

```git
# 列出所有tag
$ git tag
```

```git
# 新建一个tag在当前commit
$ git tag [tag]
```

```git
# 新建一个tag在指定commit
$ git tag [tag] [commit]
```

```git
# 查看tag信息
$ git show [tag]
```

```git
# 提交指定tag
$ git push [remote] [tag]
```

```git
# 提交所有tag
$ git push [remote] --tags
```

```git
# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

查看信息

```git
# 显示有变更的文件
$ git status
```

```git
# 显示当前分支的版本历史
$ git log
```

```git
# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat
```

```git
# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]
```

```git
# 显示指定文件相关的每一次diff
$ git log -p [file]
```

```git
# 显示指定文件是什么人在什么时间修改过
$ git blame [file]
```

```git
# 显示暂存区和工作区的差异
$ git diff
```

```git
# 显示暂存区和上一个commit的差异
$ git diff --cached []
```

```git
# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD
```

```git
# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]
```

```git
# 显示某次提交的元数据和内容变化
$ git show [commit]
```

```git
# 显示某次提交发生变化的文件
$ git show --name-only [commit]
```

```git
# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]
```

```git
# 显示当前分支的最近几次提交
$ git reflog
```

远程同步

```git
# 下载远程仓库的所有变动
$ git fetch [remote]
```

```git
# 配置远程仓库地址
$ git remote add origin url
```

```git
# 删除远程仓库
$ git remote rm origin
```

```git
# 显示所有远程仓库
$ git remote -v
```

```git
# 显示某个远程仓库的信息
$ git remote show [remote]
```

```git
# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]
```

```git
# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]
```

```git
# 上传本地指定分支到远程仓库
$ git push [remote] [branch]
```

```git
# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force
```

```git
# 推送所有分支到远程仓库
$ git push [remote] --all
```

撤销

```git
# 恢复暂存区的指定文件到工作区
$ git checkout [file]
```

```git
# 恢复某个commit的指定文件到工作区
$ git checkout [commit] [file]
```

```git
# 恢复上一个commit的所有文件到工作区
$ git checkout .
```

```git
# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]
```

```git
# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard
```

```git
# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]
```

```git
# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]
```

```git
# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]
```

```git
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]
```

其他

```git
# 生成一个可供发布的压缩包
$ git archive
```

```git
# 当前分支的时间线
$ git log --graph --pretty=oneline --abbrev-commit
```

```git
# 暂存
$ git stash
```

```git
# 恢复暂存到工作区
$ git stash apply
```

```git
# 暂存列表
$ git stash list
```

```git
# 清除暂存
$ git stash clear
```
