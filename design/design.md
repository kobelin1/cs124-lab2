
# CS124 Lab 1 Design Document
#### Team Members: Roman Herrera and Kobe Lin


## Design Decisions
One of the first design decisions that we made was to make the page itself look similar to a notepad. This was to make using the webpage to be analagous to writing to-do notes down on paper. We chose colors typical to most notepads in order to mirror this decision. Another way we implemented this idea was by having the actual body of the to-do list be left-justified, reflecting the convention of English to be written and read from left-to-right. If we were to implement this for languages read and written from right-to-left, we would have instead made our items be right-justified. In fact, we decided to have the items on our page be left-aligned in general, as that is where users will likely scan their eyes first. Furthermore, we felt that to-do lists should be very clean and easy to look at, so we chose to have the general look of the webpage be very minimal so as not to feel too distracting for the user. 

![lab1base1.png](https://www.dropbox.com/s/86qqvf1ja9krs9u/lab1base1.png?dl=0&raw=1)

Another decision we made was about buttons. 
- In regards to placement, we felt that it would make the most sense to have the "Create new item" button be right underneath the list itself, and have newly added items appear right above it. As for the "Rename", "Show Uncompleted", and "Delete All Completed" buttons, we decided to have it grouped together at the bottom of the page as they each can affect multiple list items at once, and thus have somewhat similar functionality. 
- We also decided that when a button is "in use", the buttons would stay in the same place but have their text modified to show that an action is tak  ing place (for ex. the Rename button changes its text to "Done" upon click, and back to "Rename" once the user clicks it again).

![lab1renaming1.png](https://www.dropbox.com/s/pc7jkufqhezqvkk/lab1renaming1.png?dl=0&raw=1)


## Alternative Designs

When designing our webpage, there were 4 alternative designs that we considered.

##### 1. Putting the rename/show uncompleted/delete all completed buttons in the top right
![alttopright.jpg](https://www.dropbox.com/s/4b1v6jszsq0rvei/alttopright.jpg?dl=0&raw=1)
One of our initial considerations was potentially putting these buttons in the top right of the page. However, we decided against this because we felt that it would be better for the body of the to-do list to be the first thing under the header. We would rather the user's attention to immediately be locked onto their to-do list rather than the functionality buttons. 

##### 2. Making the add button a "+" instead of the word "Add"
![altplus.jpg](https://www.dropbox.com/s/2l2xx30okl0bgno/altplus.jpg?dl=0&raw=1)
Our second consideration was having the add item button have a plus sign on it, instead of the word "Add" which we went with. This is because we felt it would be more clear with the word "Add" that clicking it would directly add the new item into the to-do list. We were worried there would be some confusion surrounding what action exactly would happen if we had the plus sign instead. One potential interpretation could have been that the plus sign would add another new item textbox instead of adding the current new item to the list.

##### 3. Having a rename button on each list item
![altrename.jpg](https://www.dropbox.com/s/q9nhnpyf69pblsb/altrename.jpg?dl=0&raw=1)
The third alternative design option that we considered was having a rename button on each list item. The way we have it now is one rename button that, when clicked, turns all list items into text boxes and allows the user to rename whichever ones they want. The option we considered was having a rename button right next to each individual list item (and thus, would allow the user to rename one item at a time). We decided against this as we felt having too many buttons would make the webpage look cluttered and messy.

##### 4. Make the header flush to the edge of the page
![altflush.jpg](https://www.dropbox.com/s/trn7ja6w4r7iosm/altflush.jpg?dl=0&raw=1)
The final alternative design choice we had considered was having the header border be flush to the edge of the page. Truthfully, this is actually a design that we wanted to go forth with. Unfortunately, we were unable to work with our webpage to make it look exactly as we wanted to. As such, we decided against it, and went forth with our current design. If we were able to create this properly, we would likely have chosen this alternative design. 

## User Testing

We ran some user testing on our friends who are not currently in the class and have not taken it before. 

We found that in general, they understood what actions could be done, such as how to add new items and how to mark items as completed. However, one action that seemed to bring about some confusion was in regards to renaming list items. When User A was trying to rename a list item, they said the first thing they would do is double-click the list item. Afterwards, they realized that there is specifically a "Rename" button in order to it. From there, they were also confused what to do after they finished renaming an item. Their first thought was to click out of the text box, then again they realized after that the rename button changed to a "Done" button in order to finish renaming. One potential cause for this confusion is because we ran the user tests on a computer. As such, one a computer it would seem intuitive to double-click to start renaming. If we were to run the user test on mobile, we predict that this issue would likely not occur. 

## Challenges Faced

One alternative design we wanted to implement was having the entire header be one color, with no padding on either side of it, as this more accurately represents real notepads. However, this ended up being our greatest challenge. No matter what we tried, the padding either was removed everywhere from the document, or no where at all. We did not want the body to lose the padding and margin since characters would start bleeding over the edge, and overall it would not look clean. After attempting to get this to work, we decided this extra little detail was not worth the challenge it was presenting. 

The arrangement of the elements on the page was also a major issue. We considered multiple layouts for the functional buttons, and to arrange everything, we used a grid box. We thought that this was be a relatively straight forward task. However, the buttons proved to be tricky to position exactly how we wanted. They filled up the entire grid cell given to them, or overlapped with each other. We wanted them to all be aligned so naturally they had to be together, but we could not easily get them to align horizontally the way we wanted them to. Even when separating them into their own columns, we still had issues with sizing, text overflowing out of the box, and again, not being aligned. Most of these issues came from when we were trying to make the buttons exist on the top right of the page. However, when we decided to swap to under the list, we experienced less challenges making the buttons format.

## Designs Most Proud Of

We feel most proud of our designs that were made with awareness that this is a mobile web page and that it is meant to be productive for the user. We are proud of the design with the rename button, such that it can used for everything at once. Originally, we thought it would be easier to have an implicit rename, such as by double tapping the word. However, for the mobile experience, double clicking is not be an obvious function. Therefore, we knew that we needed a button for renaming. However, we also thought that a rename button for every list element would be tacky and distracting. The idea that the button can be a sort of “one-stop-shop” was an interesting idea and so we decided to implement it. Because we feel like it accommodates the main goals of the page well, this was a clever idea and therefore we are proud of it. 

We are also proud of the idea to use a checkbox for each task rather than an unordered list or ordered list. The checkbox provides a clear visual representation of whether or not the task is finished (checked or not). In other implementations, it is less obvious how to go about representing a task as finished, visually and later in the code. Even though the webpage is supposed to be lists, our lack of literal lists provides a clever way to easily capture data about that task (finished or not) while also being straightforward about how to use to mark off your task. For these reasons, we feel particularly proud of the design choice to use checkboxes instead of lists. 
