
# CS124 Lab 4 Design Document
#### Team Members: Roman Herrera and Kobe Lin


## Design Decisions

Similar to all previous labs, we wanted to keep our overall style and design of our lists this same. This is to stay in line with our goal of making our to-do lists look clean and simple. 

One of the first changes we made was to how the priority icons looked. Initially, we had it so that the selected ones are black, while the unselected ones are a light gray. We wanted to add more contrast to the icons so that its easier for people with lower vision to see. As such, we decided to make exclamation points that are selected to be bright red, while unselected ones are a lighter grey. We felt this choice would help differentiate between them. Furthermore, we chose to space out the exclamation points more to similarly help differentiate them.
![prioritybuttons.png](https://www.dropbox.com/s/euzunbq0w8bt4z6/prioritybuttons.png?dl=0&raw=1)


Another design decision we made was how to display multiple task lists. In the end, we chose to have it so that the title of the task list is also a drop down that shows the user's other task lists. From this decision, we had a subsequent decision to have an "Edit Title" button in order to change the name of the task list. From here, we made the decision to also have the "Create New List +" and "Delete Current List" up at the top of the page. This is so that all of our functional buttons and inputs related to task lists as a whole all reside in one area. 

![tasklistbuttons.png](https://www.dropbox.com/s/en6q0hot9emud0s/tasklistbuttons.png?dl=0&raw=1)

When it came to accesibility labels, we wanted to convey labels and info in as little words as possible, such as only having the highest priority level be labeled as "selected", so that there would not be too much information thrown at the user at once. 

## Alternative Designs
We had various alternate designs, most of them related to the task list functionality.  

##### 1. Exclamation Points
We had various alternate designs that we were considering when deciding how exactly our exclamation point icons should look. They can be seen in the image below:

![alternateprioritybuttons.jpg](https://www.dropbox.com/s/q2u68ye7uvvs8o4/alternateprioritybuttons.jpg?dl=0&raw=1)

In the end, we settled upon our current design as we felt that it was the cleanest, and didn't rely on using images or other packages to get the icon itself. Furthermore, we felt the red would bring the most contrast compared to both the light gray unselected icons and the white background. 

##### 2. Hamburger Icon
We had an alternate design for our "Create New List+" and "Delete Current List" buttons where they were held inside of a hamburger dropdown, in which the user would have to click the hamburger first in order to get access to those functionality buttons. We felt that this would make our button layout look cleaner, but felt that it was not worth the tradeoff of extra clicks needed to get to it. 

![hamburgericon.jpg](https://www.dropbox.com/s/8x0mc7l3kmfgl13/hamburgericon.jpg?dl=0&raw=1)

##### 3. Title centering
We had an alternate design where our title was better centered and spaced with the buttons. This is actually what we ideally wanted our design to look like; however, we were unable to get it to work, so we settled on our current design. 

##### 4. Text box title and separate dropdown selection
Another alternate design we had was to make the title permanently a textbox and have a separate dropdown button that would hold all the other todo lists. However, we found some issues with having this design. One was that we felt it did not look good to have a permanent text box as this would leave a big white rectangle in the middle of our orange header. Secondll, it was not super clear that the title could be clicked and edited as there was no icon or indicator of any sort. Lastly, we also did not like the look of having the drop down be off to the side.

![textboxtitle.jpg](https://www.dropbox.com/s/hclamgife2hlssw/textboxtitle.jpg?dl=0&raw=1)

##### 5. Home page of lists
Our last design that we'd considered was having a "home page" that linked to each of the separate to do lists. We did not like this idea as we felt we want users to immediately be able to switch between to-do lists without having to go back a page and into a new page in order to switch between to do lists. Furthemore, we felt that the design would be cleaner if everything was handled in one singular "page". 

## User Testing

We performed user testing at three stages during our design. We initially asked users about accessibility and responsive design, and what they felt we could improve on, prior to making any significant functional changes. Most commented on the exclamation marks that signify priority being difficult to see, as they were a small font size. Furthermore, the difference between a checked and unchecked exclamation mark was stated to be too minimal, especially for those with worse eyesight. To account for this issues, we made checked exclamation marks to be bigger (helpful for colorblind users) and a bright red as opposed to the faded out black for unchecked marks.

During the second stage, after adding most new functionality, we again checked for accessibility and responsiveness. Most users were satisfied with the changes, but a few noted that on Chrome, the select dropdown element’s arrow was small. However, we could not find a solution for this, as it’s built in into the select item so there was not a trivial solution. Interestingly, it is much larger on Safari so it seems to be browser-based.

During the last stage of testing, we were looking for overall functionality, including responsiveness and accessibility. Most users were able to navigate through the webpage using keyboard actions and using the mouse. Only one user complained that the priority exclamation marks were unintuitive (he expected it to cycle from 0-4 instead of being able to choose a specific priority), however, this has been noted in prior testing and was considered as an alternate design prior.

## Final Design
![homepage2.png](https://www.dropbox.com/s/ljtk88qazfta8zj/homepage2.png?dl=0&raw=1)

Our final design is shown in the image above. We have two "functionality" buttons at the top ("Hide Completed" and "Delete Selected"), put the sorting functionality right below it, put the body of the list at the center, and a button at the bottom to create a new list item. A flow for each of the functionalities would be as follows: 

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

## Challenges Faced

One big challenge we faced came from working with the styling of our page. There were many times where the styling would be thrown off, or wouldn't look how we really wanted them to. For some stuff, we had to leave things be as we were struggling to get things to look exactly as we wanted. For example, we wanted some more paddings on the top functional paddings around the title of our todo list. Another challenge we faced came from making our page more accessibility friendly. Especially for screen-reader related things, we found a lot of difficulty in getting proper labels and names for things on our page. We would sometimes encounter situations where there would be lots of extra words and labels that we didn't want; we had to dig through and find what was causing this and delete it or rename things. Another challenge we encountered was overhauling our database to accomodate for multiple task lists. There were many different bugs and errors that came up during our process of integrate in the multiple task lists that needed to be fixed and dealt with. We slowly worked through these issues though by iterating through each function and making sure it works.

## Designs Most Proud Of

One design we were proud of was the changes we made to try and be more accomodating to accesibility, such as the color and sizing of the exclamation points or fixing around the font sizes around the page. We were especially proud as we felt that we were able to keep the overall "simple" look of our page that we want, but still adjusted to fit these changes. 

Another design we were proud of were the buttons at the top of the task list. For one, we were able to get it to be responsive to the size of the window. When the window is large and full sized, the buttons expand out to have the full text on them such as "Create New List +" or "Delete Current List". However, as the window size shrinks, the buttons change to have icons that are related to the function of the button. 

Another design we liked was how we handled the multiple task lists. We like the look of how all of our lists are contained in the drop down, and makes it easy to switch between the lists. Furthermore, having it not constantly be a textbox makes the overall header look better as it doesn't have a large white box along it. 

## Links to videoes

##### 1. Using application fully from the keyboard
https://youtu.be/RweT6hM959o

##### 2. Using your application from a screenreader
https://youtu.be/AINRJfMA8j0
