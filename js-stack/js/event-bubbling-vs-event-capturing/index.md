# event bubbling vs event capturing

When event occur, the browser will:
    1. trigger outermost element 's event which listen with capture mode and propagated to the inner elements.
    2. tigger innermost element 's event which listen with bubble mode and propagate to the outermost element. 
