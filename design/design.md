
# CS124 Lab 4 Design Document
#### Team Members: Roman Herrera and Kobe Lin

## Design Decisions

Similar to all previous labs, we wanted to keep our overall style and design of our lists this same. This is to stay in line with our goal of making our to-do lists look clean and simple. 

One of the first changes we made was adding a share menu.

![sharemenu.png](https://www.dropbox.com/s/jqnposbcerl3hss/Screen%20Shot%202022-05-06%20at%206.34.59%20PM.png?dl=0&raw=1) 

We wanted to mimic Google Docs' approach with their pop-up menu that contains all of the functionality. Due to space constraints on the actual lists as well, it made sense to have all of the sharing / user permissions / verification to be condensed into one small but clear button. We opted to use a lot of dropdowns in the alert since the pop-up was not that large, and it is possible that lists are shared with multiiple users. Additionally, we felt that users would likely be familiar with this as it is similar to Google's implementation and would therefore feel comfortbale with such a design. We chose to allow users to be either editors or viewers, since we felt that the list owner should be able to restrict certain users (such as young children perhaps) from changing lists.

Another design decision we made was how to perform authentication. 

![Screen Shot 2022-05-06 at 9.29.51 PM.png](https://www.dropbox.com/s/ox95vaohnlb8xxn/Screen%20Shot%202022-05-06%20at%209.29.51%20PM.png?dl=0&raw=1)

We opted to have a startup page that would require users to sign in first, with a line breakng up the sign portion and the sign up portion. We felt that users would not want a long tedious process to sign in to see their lists, and as such, we tried to make the entire design as simple and quick as possible. The centered-aligned text helps to focus the users straight to where they need to input text and continue on. Lastly, we really wanted to ensure that users could retain access of their accounts if their account was hacked, taken, or they simply forogt their password. As such, we made sure to implement a way for users to recover their password using only their email. When users sign in for the first time, they will be provided two TODO lists to start with. While one might seem to be more intuitive, we wanted users to know that they can have multiple lists and thus prompt them to use the full capabilties of the application.  


Lastly, a lot of design decisions were focused on the rules we wanted to enforce. We opted to go for a slightly more lax approach for viewing, but stricter for editing. List owners were given full functionality, such as changing other user permissions, removing users, and editing tasks, without needing to verify themselves. Our belief was that users can do whatever they want with their own lists and as such, should not be limited there. Users that were only given a view permission can only do that. Since the view mode is meant for the list owner to give very limit viewing of the list, we wanted to enforce this as much as possible. Viewers, as such, cannot alter anyhting about the lists or the tasks within them. Editors are a bit more tricky though. We understood that verification is important, yet people may not know to verify their emails before editing. We ended up deciding to essentially make non-verified editors viewers until they could verify their account. However, to help clear that up, unverified users would be prompted with an alert every time that they tried to make an edit. We felt that verified editors should be full collaborators of that list since the list owner explicitly gave them edit access over viewing access, so we gave them the majority of all functonality. They can edit tasks, share with users, edit user permissions, and remove other users. However, they cannot delete the list for everyone; only the owner can do that. Overall, we tried to be as lenient as possiible to give users as much functionality, while still maintaining some form of security and restrictions.

## Alternative Designs
We had pretty mimimal alternate designs for the new features we added in this lab. Both of us found our design for authentication to be the most straightforward. However, the main alternate deisgn we considered was placement for the person icon, and how much stuff should be in the alert. 

##### 1. Person Icon
We considered having the person icon in the title bar area to the right of the edit title button so the white space could stay entirely about the tasks.

![IMG_7C4194DCE8F0-1.jpeg](https://www.dropbox.com/s/aicfb1u2sej9bv8/IMG_7C4194DCE8F0-1.jpeg?dl=0&raw=1)

However, we opted for our current design where it is lower and in the white space because we felt that the title bar was getting too cramps, and the same arugment about having that space being dedicated for upper list level changes was applied. Overall, we just felt our current design was also cleaner.

##### 2. User information outside of share menu

We considered having more information displayed on screen about the user, such as their email that they are signed in with, and list information such as the owner of the list. 

![IMG_28A8012B944F-1.jpeg](https://www.dropbox.com/s/zw9zbmx8iinue4q/IMG_28A8012B944F-1.jpeg?dl=0&raw=1)

However, we opted for our current design where all of the information is within the share menu. We felt that this alternate design cluttered the main page far too much, especially near the row of buttons right under the title bar. Additionally, we felt that users would not really care to see this information all of the time, but would rather see more of their acutal list. We also found that most of the time when this information was relevant, it would be when using functionality found in the share menu. Therefore, we found that just keeping this information inside the share menu was best for clarity and simplicity.

## User Testing

We performed user testing at the very end since performing user testing with varying amounts of rules and features seemed less productive. We had the users focus on the authentication and sharing features the most. They found most of the design intuitive since most are comfortable with Google's design as well (this was explicitly mentioned by one user). There were very small errors that were found through this process, such as user permissions sometimes changing, but sometimes not. However, an error all of the users found was that when creating a new list, they had to refresh to actually start making edits, since the rules prevented them from reading the new list they created for some reason. This was a major issue since every user will be making new lists. To fix this, we had to acutally loosen the rules for reading of tasks which may make it less secure now, but since it is for tasks, and is only reading, we felt comfortable making this change.

## Final Design
![Screen Shot 2022-05-06 at 10.15.55 PM.png](https://www.dropbox.com/s/gqlo1uwr2sskfl1/Screen%20Shot%202022-05-06%20at%2010.15.55%20PM.png?dl=0&raw=1)

Our final design is shown in the image above. We have two "functionality" buttons at the top ("Hide Completed" and "Delete Selected"), put the sorting functionality right below it, put the body of the list at the center, and a button at the bottom to create a new list item. A person icon in the top right under the title bar leads to the share menu which contains many functions. A flow for each of the functionalities would be as follows: 

##### 1. Edit Items
If a user wants to edit an item, they can click into a text box and edit the list item.

![lab4rename.png](https://www.dropbox.com/s/ktfth2qvdykjq7i/lab4rename.png?dl=0&raw=1)

In the example above, a user may choose to change the final list item name from "Raichu" to "Alolan Raichu". Clicking out of the text box with finalize the edit. 

##### 2. Hide Completed
![lab4hidecompleted.png](https://www.dropbox.com/s/375jx3xx29owlcs/lab4hidecompleted.png?dl=0&raw=1)

If the user has any completed items, clicking the "Hide Completed" button will remove the completed item from the screen. Furthemore, the "Hide Completed" button's text will be changed into "Show All Items". Clicking this button will bring back the completed items, and change the button's text back to "Hide Completed".

##### 3. Delete Selected

If the user has any completed items, the "Delete Selected" button will appear. Clicking this button will change the button's text to "Confirm Deletions", and remove all other buttons on the page. 

![lab4deletionpre.png](https://www.dropbox.com/s/9y1gboxzv5ivacd/lab4deletionpre.png?dl=0&raw=1)

The "Confirm Deletions" button will delete any completed tasks the user may have. The "Cancel" button will back the user out of the confirmation screen and back to the initial page with no changes made.

![lab4deletionpost.png](https://www.dropbox.com/s/5lmu7jkxy4gnwa0/lab4deletionpost.png?dl=0&raw=1)

Once the user does confirm their deletion, they will be returned back to the intial page, and the "Delete Selected" button will no longer be visible.

##### 4. Sorting Items

The "Sorting by: " lets the user know what the list is currently being sorted by. For example, in the image below, the list is sorted by priority in an ascending order. 

![lab4deletionpost.png](https://www.dropbox.com/s/5lmu7jkxy4gnwa0/lab4deletionpost.png?dl=0&raw=1)

Clicking onto the dropdown bar brings up a menu of various different options the user could select to sort their items by. 

![lab4sortingpre.png](https://www.dropbox.com/s/8cgrunf48frzvdp/lab4sortingpre.png?dl=0&raw=1)

Clicking a new option will refresh the page, and re-display the list items in the order the user has selected. 

![lab4sortingpost.png](https://www.dropbox.com/s/gncnv6sk75i6cjp/lab4sortingpost.png?dl=0&raw=1)

##### 5. Creating new item

Clicking the "Create New Item +" button brings up a new page where the user can type in the name of the new list item. 

![lab4addingpre.png](https://www.dropbox.com/s/xz7azq2jjlb5gzk/lab4addingpre.png?dl=0&raw=1)

Clicking "Add" will then add the new list item to the list. It will be initialized with a priority of 0. 

![lab4addingpost.png](https://www.dropbox.com/s/64a2wo44e2edw9r/lab4addingpost.png?dl=0&raw=1)

##### 6. Priority

Priority is listed by the items, symbolized by exclamation points with higher priority being represented with a higher number of exclamation points. Clicking an exclamation point will set a list item to that priority.

![lab4priority.png](https://www.dropbox.com/s/u7mpvivy0a282gs/lab4priority.png?dl=0&raw=1)


In the image above, the "pikachu" list item's priority was changed from 0 priority to 2 priority. 

##### 7. Switching Task Lists

Clicking on the title of the current to-do list will open up a dropdown menu containing the other to-do lists.

![lab4switchtasklistpre.png](https://www.dropbox.com/s/eq5zlw34y43ybed/lab4switchtasklistpre.png?dl=0&raw=1)

Selecting one of the other to-do lists will switch the page to the new one that was selected.

![lab4switchtasklistpost.png](https://www.dropbox.com/s/oxb0fel1tf0k7ki/lab4switchtasklistpost.png?dl=0&raw=1)

##### 8. Edit Task List Title

To edit the task list, the user would have to click the button with a pencil, or the "Edit Title" button. This will change the to-do list title to be an editable textbox. 

![lab4tasklistrenamepre.png](https://www.dropbox.com/s/pkneypox78zrxpq/lab4tasklistrenamepre.png?dl=0&raw=1)

After typing in the new desired tasklist name, clicking out will finalize the change.

![lab4tasklistrenamepost.png](https://www.dropbox.com/s/lct59a4gh7d0yni/lab4tasklistrenamepost.png?dl=0&raw=1)

##### 9. Create new task list
Clicking the plus button, or the "Create New List +" button will change the top bar to have a text box where the user can input the name of the new list. 

![lab4newlistpre.png](https://www.dropbox.com/s/wwa6y0fazbnmhlu/lab4newlistpre.png?dl=0&raw=1)

Clicking the "Create new list" button will create the new list, initialized with 0 items.

![lab4newlistpost.png](https://www.dropbox.com/s/iw6xl8s5uj5z2b7/lab4newlistpost.png?dl=0&raw=1)

##### 10. Delete current task list
Clicking the trash can button, or the "Delete Current List" button will bring up new buttons. 

![lab4deletelistpre.png](https://www.dropbox.com/s/cjvinuicffwcslm/lab4deletelistpre.png?dl=0&raw=1)

Clicking the "Confirm Deletion of Current List" button will cause the current list to be deleted, and return the user to the initial task list.

![lab4deletelistpost.png](https://www.dropbox.com/s/te4k4t9fxik4ysl/lab4deletelistpost.png?dl=0&raw=1)

##### 11. Share menu
Click the person icon to open the menu. It contains all the information regarding ownership, permissions, and shared users.

![Screen Shot 2022-05-06 at 6.43.06 PM.png](https://www.dropbox.com/s/jg6ahojudqo7f9p/Screen%20Shot%202022-05-06%20at%206.43.06%20PM.png?dl=0&raw=1)

This menu will pop up, prompting the user with various functions. At the top, the list ownwer is shown. Just under that is the section to share the list with new users. Beneath that is the section to find current users and their permissions. Then, the current user is displayed, and if the email if not verified, then a verification button is shown which sends a verification email to the email when clicked. At the very bottom is a done button that closes the pop-up and a Sign Out button that signs the current user out.

![sharemenu.png](https://www.dropbox.com/s/jqnposbcerl3hss/Screen%20Shot%202022-05-06%20at%206.34.59%20PM.png?dl=0&raw=1)

##### 12. Share menu - Sharing with new users
Type into the first input box to enter the email of the user you want to share with. There is a dropdown to choose the permissions you wish to give to the new user. Note that only the document owner or verified editors can share the list with others. Hitting send will share the list with the assossicated email.

![Screen Shot 2022-05-06 at 8.12.36 PM.png](https://www.dropbox.com/s/look5n6vnzkshmu/Screen%20Shot%202022-05-06%20at%208.12.36%20PM.png?dl=0&raw=1)

##### 13. Share menu - Users already shared with
Click the dropdown underneath "Shared With" to see a list of all users that the document is shared with.

![Screen Shot 2022-05-06 at 8.16.01 PM.png](https://www.dropbox.com/s/19bfv6171digqn8/Screen%20Shot%202022-05-06%20at%208.16.01%20PM.png?dl=0&raw=1)

After choosing one, the other dropdown to the right will reflect their current permissions (Edit or View). Using this dropdown, you can change that specific user's permissions, as long as you are the list's owner. There will also be an unshare button, that if clicked, will remove that user from the list. Note that this will not appear next to the owner and the owner and verified editors can perform this action.

![Screen Shot 2022-05-06 at 8.16.36 PM.png](https://www.dropbox.com/s/pjwn3r3o4sclism/Screen%20Shot%202022-05-06%20at%208.16.36%20PM.png?dl=0&raw=1)

#### 14. Authentication
In order to see any task lists, users must first sign in if they have an account or sign up if they do not. If a user forgot their password, they can enter their email in the text box next to the send reset email and then click that button to an email to reset the passsword.

![Screen Shot 2022-05-06 at 9.29.51 PM.png](https://www.dropbox.com/s/ox95vaohnlb8xxn/Screen%20Shot%202022-05-06%20at%209.29.51%20PM.png?dl=0&raw=1)

## Challenges Faced

The biggest challenged face was acutally working with our old code. We have been using one large code file for everything despite knowing separating code was more effective. Additionally, sloppy coding practices and large lengthy statement made the code even more difficult to use. When we were trying to make sure on the front end that rules were being followed, it was getting difficult to track issues but also where variables needed to be passed on / where their scope was. Debugging this lab was by far the hardest out of all the labs and there was unforutanely a lot of it. Therefore, our biggest challenge was jsut working with a poorly made codebase. We did not have a good solution, since the solution would have been to write cleaner code from the start and we did not want to completely redo our project. 

The second biggest challenge was the rules. Whether we were breaking some permissions or completely passing them, the program wouldd throw out random undefined errors. For instance, we made the document readable if the user was signed in and was a viewer. This would crash the program and we would not understand why since we checked that this should be valid. This issue extended to all of the capabilities and not just read, so we were very confused. However, the issue was that we were using a wildcard in our path so it would also go one level deeper and find the tasks which did not have the correct data to check for ownership or viewership. Switching this and adding more error handling allowed us to resolve this issue.

## Designs Most Proud Of

We were most proud of the design for the share menu. We found that the alert style appraoch was far better than any other, and we impressed ourselves by being able to make it and contain a signficant amount of information all within it. We were partically excited by our dropdown functions to display all of the users. We found that this was a very elegant approach that was still intituive for users and saved on space, which can get very limited on mobile. We were also pleased that we were able to change the displayed value of the user permissions depending on the user selected to the left. This took a clever solution since dropdowns are not easily manipulated in our experience.

## Links to videos for Lab 4

##### 1. Using application fully from the keyboard
https://youtu.be/RweT6hM959o

##### 2. Using your application from a screenreader
https://youtu.be/AINRJfMA8j0
