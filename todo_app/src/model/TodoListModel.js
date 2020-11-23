import {EventEmitter} from "../EventEmitter.js";

export class TodoListModel extends EventEmitter{
    /**
     * @param {TodoItemModel} [items] 初期アイテム一覧(デフォルトは空の配列)
     */
    constructor(items = []){
        super();
        // から配列として、itemsを定義
        this.items = items;
    } 

    /**
     * TodoItemの合計個数を返す
     * @returns {number}
     */
    getTotalCount(){
        return this.items.length;
    }

    /**
     * 表示できるTodoItemの配列を返す
     * @returns (TodoItemModel[])
     */
    getTodoItems(){
        return this.items;
    }

    /**
     * TodoListの状態が更新されたときに呼び出されるリスナー関数を登録する
     * @param {Function} listener
     */
    onChange(listener){
        // super()で継承しているため、メソッドを使用できる
        // changeというイベント名で、引数の関数を登録する
        this.addEventListener("change", listener);
    }

    /**
     * 状態が変更されたときに呼ぶ。登録済みのリスナー関数を呼ぶ
     */
    emitChange(){
        // changeで登録された関数を全てディスパッチする
        this.emit("change")
    }

    /**
     * TodoItemを追加する
     * @param {TodoItemModel} todoItem
     */
    addTodo(todoitem){
        // 配列に要素を追加するメソッドpush
        this.items.push(todoitem);
        // 上で定義したemitChangeを実行
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemのcompletedを更新する
     * @param {{ id:number, completed: boolean }}
     */

    updateTodo({ id, completed }){
        // 'id'が一致するTodoItemを見つけ、あるなら完了状態の値を更新する
        const todoItem = this.items.find(todo => todo.id === id);
        if (!todoItem){
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     * 指定したidのTodoItemを削除する
     * @param {{ id:number }}
     */
    deleteTodo ({ id }){
        // `id`に一致しないTOdoItemだけを残すことで、`id`に一致するTodoItemを削除する
        this.items = this.items.filter(todo => {
            return todo.id !== id;
        });
        this.emitChange();
    }

}