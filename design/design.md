
# CS124 Lab 2 Design Document
#### Team Members: Roman Herrera and Kobe Lin


## Design Decisions

When starting on Lab 3, we discussed about any potential design changes that we wanted to make between the previous lab and this lab. We decided to keep the overall style of our design, to keep our goal of making our todo list look very simple, and similar to a notepad. 

However, one change we decided to make was how items could be edited. Previously, we made it so that the user would need to click an "Edit Items" button, which would take them to a separate screen where they could then edit their list items.

![homepage.png](https://www.dropbox.com/s/lwgmhsyzd6ifbri/homepage.png?dl=0&raw=1)

We decided to change this design. We removed the "Edit Items" button, and instead changed it so that each list item itself is a text box, the content of which could be changed at any time without needing to select an extra button. This decision was influenced by what we felt would be more intuitive for our design, feedback we received from user testing on our previous design, and because this new change works better with Firestore. 

![homepage1.png](https://www.dropbox.com/s/iksyb4y4rwdph4y/homepage1.png?dl=0&raw=1)

From here, we had to make a design choice about how we would decide to display priority for the list items. We ended up deciding that we would show priority with exclamation points. New list items start with three faded exclamation points next to them. From here, users can select any of one, two, or three exclamation points to assign a priority to that list item.  We also decided that if users want to decrease the priority of a list item, they can click again to remove an exclamation point. We also wanted to avoid using words for priorities (like "low", "medium", and "high") and instead have a varying number of exclamation points to be more language-free in its implementation.  

Another design choice that we made was on sorting. We decided to have it displayed right above the list items. It reads "Sorting by: " then has a checkdown menu which shows the current sorting option. Clicking the dropdown menu brings up the various sorting options the users can choose from. Users are able to sort by name, priority, and creation date; furthermore, we had functionality to be able to sort in a "forwards" and "backwards" order for each sorting choice. 

## Alternative Designs
A lot of the alternate designs we considered were similar to prior. 

##### 1. Popup alert

![IMG_0279.jpg](https://www.dropbox.com/s/8d332twxoq119m1/IMG_0279.jpg?dl=0&raw=1)

Just like in our previous lab, we considered having a pop-up alert when the delete button is pressed to give the users a delete confirmation button. However, we faced some time constraints, and decided to keep the functionality we have now where clicking the delete button changes its text and functionality to be a confirmation button. 

##### 2. Multi-click Priority

Another design we considered was having it so that the user could click the priority exclamation points multiple times in order to cycle through all the priority options (starting from 1, going up to 3, and coming back to 1). We decided against this, as we elt that it would be best for the users if they could directly click on the priority they wanted (for example, if they want a priority of 3 on an item, they would not have to tap multiple times to get to it). Furthermore, since this is to be displayed on a mobile device, we thought that tapping multiple times could cause issues and annoyances for the user, such as zooming in on that part of the screen as they are tapping through the priority options. 

## User Testing

We performed user testing at the end of our design, after which we made some changes. Most users were able to intuitively understand most functions and did not expect more than we provided. However, one capability that we did not anticipate that users would expect was when clicking exclamation marks for priority, they wanted the exclamation mark they were clicking to toggle itself. For instance, if 2 out of 3 exclamation marks were checked, and if the user clicked the 2nd exclamation mark again, they expected it to become unchecked and decrease the priority to 1 out of 3 exclamation marks. We did not anticipate this but found it to make sense, so we went and implemented this. One user wanted to be able to edit the title and change the background color as well. We chose not to allow this, for simplicity sake but we acknowledge that this is something we would like to implement in the future when we begin to allow for multiple lists. We did not get any negative comments about renaming, so we think that our redesign worked as intended. Overall, user testing was more positive this round than prior rounds, and we think that our redesigns were for the better.

## Final Design
![homepage2.png](https://www.dropbox.com/s/ljtk88qazfta8zj/homepage2.png?dl=0&raw=1)

Our final design is shown in the image above. We have two "functionality" buttons at the top ("Hide Completed" and "Delete Selected"), put the sorting functionality right below it, put the body of the list at the center, and a button at the bottom to create a new list item. A flow for each of the functionalities would be as follows: 

##### 1. Edit Items
If a user wants to edit an item, they can click into a text box and edit the list item.

![renamingitems.png](https://www.dropbox.com/s/5fsulpey44e83lo/renamingitems.png?dl=0&raw=1)

In the example above, a user may choose to change the final list item name from "blastoise" to "mega blastoise". Clicking out of the text box with finalize the edit. 

##### 2. Hide Completed
![hidecompleteditems.png](https://www.dropbox.com/s/l0j341mpnqngp53/hidecompleteditems.png?dl=0&raw=1)

If the user has any completed items, clicking the "Hide Completed" button will remove the completed item from the screen. Furthemore, the "Hide Completed" button's text will be changed into "Show All Items". Clicking this button will bring back the completed items, and change the button's text back to "Hide Completed".

##### 3. Delete Selected

If the user has any completed items, the "Delete Selected" button will appear. Clicking this button will change the button's text to "Confirm Deletions", and remove all other buttons on the page. 

![confirmingdeletionspre.png](https://www.dropbox.com/s/81387f44gatymps/confirmingdeletionspre.png?dl=0&raw=1)

The "Confirm Deletions" button will delete any completed tasks the user may have. The "Cancel" button will back the user out of the confirmation screen and back to the initial page with no changes made.

![confirmingdeletionspost.png](https://www.dropbox.com/s/m0djds3icsp7wut/confirmingdeletionspost.png?dl=0&raw=1)

Once the user does confirm their deletion, they will be returned back to the intial page, and the "Delete Selected" button will no longer be visible.

##### 4. Sorting Items

The "Sorting by: " lets the user know what the list is currently being sorted by. For example, in the image below, the list is sorted by priority in an ascending order. 

![confirmingdeletionspost.png](https://www.dropbox.com/s/m0djds3icsp7wut/confirmingdeletionspost.png?dl=0&raw=1)

Clicking onto the dropdown bar brings up a menu of various different options the user could select to sort their items by. 

![sortingitemspre.png](https://www.dropbox.com/s/9fgcl7pb951it0v/sortingitemspre.png?dl=0&raw=1)

Clicking a new option will refresh the page, and re-display the list items in the order the user has selected. 

![sortingitemspost.png](https://www.dropbox.com/s/cjd7ev8z29nq9o1/sortingitemspost.png?dl=0&raw=1)

##### 5. Creating new item

Clicking the "Create New Item +" button brings up a new page where the user can type in the name of the new list item. 

![createnewpre.png](https://www.dropbox.com/s/yzs9uilxsp0h35k/createnewpre.png?dl=0&raw=1)

Clicking "Add" will then add the new list item to the list. It will be initialized with a priority of 0. 

![createnewpost.png](https://www.dropbox.com/s/mzpingkfxlvrdla/createnewpost.png?dl=0&raw=1)

##### 6. Priority

Priority is listed by the items, symbolized by exclamation points with higher priority being represented with a higher number of exclamation points. Clicking an exclamation point will set a list item to that priority.

![prioritypost.png](https://www.dropbox.com/s/rt6dt0cof8arrlg/prioritypost.png?dl=0&raw=1)

In the image above, the "pikachu" list item's priority was changed from 0 priority to 2 priority. 

## Challenges Faced

Interestingly, most of our significant challenge came from redesigning existing features, and not from adding Firestore, sorting, or priority. Our greatest challenge came from initializing the selected items. We had whether or not the items were checked be saved in the database. Since the selected items were a local variable, we would just filter the list items in the database based on the checked value and use that. However, for whatever reason, despite print statements showing that the filter function was properly creating the list as intended, when we initialized the selected items list to that value, it would always become an empty list. Because of this, the delete buttons would bug out, since it assumes nothing is selected despite items being checked. After significant testing along with grutoring, it randomly just started working after some combination of logic statements. We think it was likely some rendering issue, but we are not fully sure what was the direct cause for this issue. Our second biggest challenge was implementing the dropdown menu. We were trying to use pre-built dropdown menus to look cleaner and for simplicity, but nothing was working right. We tried various different modules and libraries, all of which did not work, with errors outright or simply not working functionally. We ended up opting for a select input since this would not require outside libraries, but still worked as needed.

## Designs Most Proud Of

One design we were most proud of was how we decided to display priority. We felt that it was a pretty minimal design, but still clear and effective for what we wanted. Furthermore, we were glad that we were able to get it so that a user can click directly on a specific priority to set it for that item. 

Another design we were proud of was getting the new item editing to work. As we felt that this was the more intuitive way to have list items be renamed, we were proud that we were eventually able to get this feature to work, as well as making it not look out of place.

Another design we were proud of was being able to get sorting for both directions for each of our options. This gives users more options when sorting, and we felt that it was good to have both options as this is pretty common across many applications to have forwards and backwards sorting. 
