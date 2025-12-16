# TODO - Add size.js integration in AddProduct.jsx

1. In src/Componentes/Pages/Products/AddProduct.jsx:
   - Import sizeGroup (already imported).
   - Add utility function(s) to retrieve sizes from sizeGroup based on current category/subCategory/subSubCategory.
   - Add new UI component for size selection (multi-select dropdown or checkbox list) populated dynamically.
   - Replace the existing manual "Sizes (comma-separated)" input field with the dynamic size selector.
   - Update state management to handle size selections from the new UI instead of manual input.
   - Ensure form submission sends the selected sizes.
   - Maintain existing validation and error display for size field.
   - Add cleanup for cases when category/subcategory changes, clear or reset size selections accordingly.

2. Test locally:
   - Add a new product with various categories and check size options appear correctly.
   - Edit a product and confirm size selections are pre-filled correctly.
   - Verify form submission and data persistence with sizes.
   - Check error display on invalid inputs if any.

3. Finalize & commit changes.

Please confirm to proceed with implementation based on this TODO plan.
