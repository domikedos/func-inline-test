# Inline specifier test

# Introduction
From docs: *If a function has inline specifier, its code is actually substituted in every place where the function is called*.

But if I create a variable with a **function with inline specifier** value and call it, then compute fee will be the same as if I call function without **inline specifier**.
Is it bug or did i misunderstand something?

## Description
I have two smart contracts:
1. With the **inline specifier**:
![sc_with_inline_specifier](https://github.com/user-attachments/assets/d9b71819-2840-4017-b769-a701abd31950)
2. Without the **inline specifier**:
![sc_without_inline_specifier](https://github.com/user-attachments/assets/3abb8500-cf59-49cb-aadb-fd965259c797)

Then I ran these <a href="https://github.com/domikedos/func-inline-test/tree/master/tests">tests</a> and this is what I got:
1. With the **inline specifier**:
![fees_with_inline_specifier](https://github.com/user-attachments/assets/88027be4-d2e1-43cb-9f91-a197c50c0de1)
2. Without the **inline specifier**:
![fees_without_inline_specifier](https://github.com/user-attachments/assets/9328208b-e32c-4ef4-bc24-18cafa08924f)

## Results

As we see, the compute fees are completely the same. Does it mean, that TVM doesn't optimize function call?
