/** 
 * html-util.jsのメソッドを呼び出す
 */ 
import {TodoListModel} from "./model/TodoListModel.js";
import {TodoItemModel} from "./model/TodoItemModel.js";
import {element, render} from "./view/html-util.js"

export class App {
    constructor(){
        // TodoListの初期化
        this.todoListModel = new TodoListModel();
    }
    mount(){
        // 要素を取得している
        const formElement = document.querySelector("#js-form");
        const inputElement = document.querySelector("#js-form-input");
        const containerElement = document.querySelector("#js-todo-list");
        const todoItemCountElement = document.querySelector("#js-todo-count");
        
        this.todoListModel.onChange(() => {
            // TodoリストをまとめるList要素
            const todoListElement = element`<ul />`;
            // それぞれのTodoItem要素をTodoListElement以下へ追加する
            const todoItems = this.todoListModel.getTodoItems(); //要素を取得
            todoItems.forEach(item => {
                // 完了済みならchecked属性を付け、未完了ならchecked属性を外す
                // input要素にはcheckboxクラスをつける
                const todoItemElement = item.completed 
                    ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s><botton class="delete">x</button></li>`
                    : element`<li><input type="checkbox" class="checkbox">${item.title}<button class="delete">x</button></li>`;
                // チェックボックスのトグル処理
                const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
                inputCheckboxElement.addEventListener("change", ()=>{
                    // 指定したTodoアイテムの完了状態を反映させる
                    this.todoListModel.updateTodo({
                        id: item.id,
                        completed: !item.completed
                    });
                });
                
                // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
                const deleteButtonElement = todoItemElement.querySelector(".delete");
                deleteButtonElement.addEventListener("click", ()=>{
                    this.todoListModel.deleteTodo({
                        id: item.id
                    });
                });
                todoListElement.appendChild(todoItemElement);
            });
            
            render(todoListElement, containerElement);
            // アイテム数の表示を更新
            todoItemCountElement.textContent = `Todoアイテム数：${this.todoListModel.getTotalCount()}`;
        });
        // フォームを送信したら、新しいTodoItemModelを追加する
        formElement.addEventListener("submit", (e) => {
            event.preventDefault();
            // 新しいTodoItemをTodoListへ追加する
            this.todoListModel.addTodo(new TodoItemModel({
                title: inputElement.value, 
                completed: false
            }));
            inputElement.value = "";
        });


        // // Todoアイテム数
        // let todoItemCount = 0;
        // formElement.addEventListener("submit", (event) => {
        //     // submitイベントの本来の動作を止める
        //     event.preventDefault();
        //     // 追加するTodoアイテムの要素(li要素)を作成する
        //     const todoItemElement = element`<li>${inputElement.value}</li>`;
        //     // Todoアイテムをontainerに追加する
        //     containerElement.appendChild(todoItemElement);
        //     // Todoアイテム数を+1し、表示されているテキストを更新する
        //     todoItemCount += 1;
        //     todoItemCountElement.textContent = `Todoアイテム数：${todoItemCount}`;
        //     // 入力欄を空文字列にしてリセットする
        //     inputElement.value = "";
        // });
    }
}

