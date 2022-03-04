
# CS124 Lab 2 Design Document
#### Team Members: Roman Herrera and Kobe Lin


## Design Decisions
When starting this lab, we had to decide whether or keep our designs from last time or to try to make some larger design changes. For the sake of simplicity and because we liked our design, we continued to use the overall style of the original design we created. Our main goal was still to have a very simple overall look to mimic a real life notepad. However, we made noticeable edits based on feedback we received. For the same reasons as before with the earlier design, we had the list be left-justified. 

![homepage.png](https://www.dropbox.com/s/lwgmhsyzd6ifbri/homepage.png?dl=0&raw=1)

Some new design choices we made though were small wording changes, such as the old “Show Uncompleted” to “Hide Uncompleted” as it is makes the button’s function more intuitive. We also switched the “Rename” button to be called “Edit Items” as various users found the name of the button to be confusing, since the list items are not really names. Furthermore, we changed the “Delete All Completed” functionality to “Delete Selected” to give users more freedom to delete what they wish from the list. We also chose to have all other buttons disappear now when clicking “Create a new list +”, “Edit Items”, or “Delete Selected”. This was to force the user to interact with the intermediate step of the process without being able to press other buttons. For example, if you were to press “Edit Items”, the button would change to “Finish Editing,” and all other buttons would disappear so the focus is entirely on the text boxes to made edits with and the “Finish Editing” button. 

Also based on user testing, we found that having the option to do other things during these intermediate steps made them feel like nothing happens with their button click since the button name change would be subtle. We also chose to place the important functionality buttons at the top instead of underneath the list as before. It was noted to us that it could become problematic if too many tasks were created. Furthermore, it is more difficult to see, and therefore more difficult for the user to know immediately what they can do. In similar spirit as before, these three button are grouped together due to their similar scope of functionality over the entire list. However, we kept the “Create new item +” button under the list because it makes sense that a new item would be formed at the bottom of the list, so users would look there to create the new item. Additionally, it does not have the same scope as the other buttons, so it could become confusing to have it paired with them.

## Alternative Designs
A lot of the alternate designs we considered were similar to prior. 

##### 1. Button layout
![callmom_pre.png](https://www.dropbox.com/s/ubdwwwkvjczfark/callmom_pre.png?dl=0&raw=1)

The button layout was a notable decision, as we still considered our original layout above as an alternate design. However, as noted above, we found that having the important, all encompassing buttons at the top in a static location would make the most sense.

##### 2. Popup alert

![IMG_0279.jpg](https://www.dropbox.com/s/8d332twxoq119m1/IMG_0279.jpg?dl=0&raw=1)

We also considered a pop-up alert when the delete button is pressed, rather than our implementation where every other functional button disappears except the new confirm deletion button and cancel button. We actually consider this alternate design to be superior to our current implementation, as it truly prevents the user from making any other changes and is attention grabbing. However, we were faced with time constraints so we focused on creating a simpler, but less elegant solution. 

##### 3. Editing items
![IMG_0281.jpg](https://www.dropbox.com/s/litdf644smzlmms/IMG_0281.jpg?dl=0&raw=1)
There was also discussion about making editing item individualized. We found that having multiple items all editable at once, and saving all of it at once was a pain to implement. The implementation was bug-ridden and was not simple at all. Changing to only one edit would be a simpler solution and was one suggested by a user during test. They said that the concept of an “Edit Text” was non-intuitive and that we should allow for double-click instead. We kept with our design though because double-clicking on a mobile app is non-intuitive and without instructions, would not be abundantly clear. We felt that a singular button to control editing is more self-explanatory, and since users have to scroll with their fingers, we do not want a single touch to constantly bring up editing fields as they scroll.

## User Testing
We performed some user testing at two stages of the process. We again ran it on our friends who are not currently in the class and have not taken it before. 

In the first round of testing, most users understood all of the actions. Similar to last time, they understood the basic actions and did not expect more from the app than what was provided. They understood how to add items and how to mark the items as completed. However, many noted how buttons clicks on processes with multiple steps felt like nothing happened and were unintuitive. Notably, they found that they could continue pressing other buttons, and performing other actions, even if they had to still confirm the delete for instance. Like last time, there was the same user who was confused about the “Edit Items” button. When the user was trying to edit the list, they were trying to double-click the item like last time. Eventually, they resorted to the “Edit Items” button, but found the whole process unintuitive for a task manager. However, other users did not find this to be an issue, and as described earlier, we wanted to maintain the use of a button rather than double-clicking, especially since the application was deigned for mobile. Another notable problem pointed out by a few users was that when deleting items, they could not cancel their deletion, which was a huge oversight on our part.

## Final Design
![homepage.png](https://www.dropbox.com/s/lwgmhsyzd6ifbri/homepage.png?dl=0&raw=1)

Our final design is shown in the image above. We decided to have three "functionality" buttons at the top ("Edit Items", "Hide Completed", and "Delete Selected"), put the body of the list at the center, and a button to create new items underneath the list body. A flow for each of the functionalities would be as follows:

##### 1. Edit Items
When the user first clicks on the "Edit Items" button, a new page will be brought up where each of the items becomes an editable text box. 

![editingpre.png](https://www.dropbox.com/s/3lvci779r5u8eub/editingpre.png?dl=0&raw=1)

In the example above, a user may choose to change the first list item from "Call Mom" to "Call Dad". Clicking the "Finish Editing" button will bring the user back to the initial page, as seen in the image below.

![editingpost.png](https://www.dropbox.com/s/im9b12rt5re52gk/editingpost.png?dl=0&raw=1)

##### 2. Hide Completed
![hidecompleted.png](https://www.dropbox.com/s/0j48mfglyulfnpb/hidecompleted.png?dl=0&raw=1)

If the user has any completed items, clicking the "Hide Completed" button will remove the completed item from the screen. Furthemore, the "Hide Completed" button's text will be changed into "Show All Items". Clicking this button will bring back the completed items, and change the button's text back to "Hide Completed".

##### 3. Delete Selected

If the user has any completed items, the "Delete Selected" button will appear. Clicking this button will bring up a new page, where all the functionality buttons disappear and are replaced with a "Confirm Deletions" button and a "Cancel" button

![confirmdeletepre.png](https://www.dropbox.com/s/0133r09dvtgs3b4/confirmdeletepre.png?dl=0&raw=1)

The "Confirm Deletions" button will delete any completed tasks the user may have. The "Cancel" button will back the user out of the confirmation screen and back to the initial page with no changes made.

![confirmdeletepost.png](https://www.dropbox.com/s/9wqxbh6qxmpy93b/confirmdeletepost.png?dl=0&raw=1)

Once the user does confirm their deletion, they will be returned back to the intial page, and the "Delete Selected" button will no longer be visible.

## Challenges Faced

We faced many significant challenges in the portion of the design process. One major issue was the styling, as our .css file from before was not formatting things correctly. Buttons were not formatting to the top, font sizes were all over the place, and text boxes were appearing all across the screen. It was a disaster in terms of simplicity and intuitive use, so we had to spend a significant amount of time fixing the .css to make the whole experience significantly better for the users. Another major challenge we faced was the editing items function. Since our list items are checkboxes, their value is not editable. Therefore, we had to figure out how to “convert” everything into a text box to receive edits, then using those edits, change the current values in the list of items, and re-render the checkboxes again. Dealing with this amount of changes proved difficult to implement. Many of times, objects would suddenly become undefined and then all of the check boxes would suddenly have no text values. Eventually we got it to work using numerous states, loops, and helper functions. Another struggle was implementing the “Hide completed” and “Show all buttons”. We anticipated this part to be an easier implementation but as we worked through it, we discovered that the current way we were implementing our selection was poor and was not helpful (having separate states for everything rather than using an attribute of the items). Because of it, we chose to redo parts of our implementation to make decisions further down easier. So while the buttons were not a major struggle to create, they showed significant flaws with our approach and forced us to redo parts of our implementation. 

## Designs Most Proud Of

We were most proud of being able to have checkboxes and edit their text. One major concern throughout the implementation was how to convert our checkboxes into text boxes that the users can input into. Initially, it started with creating an item, where a text box appears and the user types what they want. We were proud that we found a way to use a state to keep track of the user input and generate a new checkbox to reflect their input. This was expanded on with the edit items button, as it was a similar problem but scaled up. However our approach for this had to be different, as one state was not going to cut it. We felt like our solution to this was a bit dirty, but we were just proud that we were able to get it to work after hours of debugging and getting ready to give up on the idea. Another smaller design choice we are proud of is hiding all buttons whenever a multi-step process was created. We were worried about fringe cases where users simply spam all buttons, so by hiding all of the buttons, we were able to prevent having catch these weird sequences. We are proud that we were able to force users to proceed with these steps and not cause issues by taking unorthodox sequences of actions. 
