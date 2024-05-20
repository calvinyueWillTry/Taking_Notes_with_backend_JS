Summary of Note Taking Site:
Start with the home page, which can be readily recalled at any time, by clicking the "Note Taker" icon in the top left corner.
<img width="1280" alt="Screen Shot 2024-05-18 at 9 48 53 PM" src="https://github.com/calvinyueWillTry/Taking_Notes_with_backend_JS/assets/158237430/7c025a98-224c-46a7-8dff-05625afe3913">
Click on the "Get Started" button to get to the note taking page.
<img width="1280" alt="Screen Shot 2024-05-18 at 9 49 01 PM" src="https://github.com/calvinyueWillTry/Taking_Notes_with_backend_JS/assets/158237430/ec9c785b-cd08-4e8c-b649-770451131ab0">
One can enter whatever text they want into the big and small box, even using a tab to move to the small box. This can be done by taking those areas of the page (in JS variables noteTitle line 10 and noteText line 11), then convert their value to  text (lines 64/65).
<img width="1280" alt="Screen Shot 2024-05-18 at 9 49 10 PM" src="https://github.com/calvinyueWillTry/Taking_Notes_with_backend_JS/assets/158237430/f6312991-2640-42a8-ba39-c937154dce06">
When click the "save note," saveNote (line 39) is called to POST the stringified version of those object. Then in handleNoteSave (line 75), it's reformatted as title and text, then renders it using getAndRenderNotes(line 187) and renderActiveNote (line 56).
<img width="1280" alt="Screen Shot 2024-05-18 at 9 49 19 PM" src="https://github.com/calvinyueWillTry/Taking_Notes_with_backend_JS/assets/158237430/efaf4744-b84d-4da6-8c52-cbc8d0788899">
To delete it,
<img width="1280" alt="Screen Shot 2024-05-18 at 9 49 32 PM" src="https://github.com/calvinyueWillTry/Taking_Notes_with_backend_JS/assets/158237430/96a0ba95-ad13-4de0-b8dd-8056d8cd89d2">
 
