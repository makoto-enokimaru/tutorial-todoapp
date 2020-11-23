export class EventEmitter {
    constructor(){
        // 登録する[イベント名, Set(リスナー関数)]を管理するMap
        // Map オブジェクトはキーと値のペアを保持する
        this._listners = new Map();
    }

    /**
     * 指定されたイベントが実行されたときに呼び出されるリスナー関数を登録する
     * @param {string} type　イベント名
     * @param {Function} listener イベントリスナー
     */

    addEventListener(type, listener){
        //  指定したイベントに対応するSetを作成しリスナー関数を登録する
        // Setは値が重複しないことを保証する配列のようなもの(indexなどは持たない)
        // セットの初期登録
        if(!this._listners.has(type)){
            // Map.prototype.set()でMapにSetを追加
            this._listners.set(type, new Set());
        }
        // リスナー関数のtypeを取得してlistenerSetに格納する
        const listenerSet = this._listners.get(type);
        // listenerSetにlistener関数を登録する
        listenerSet.add(listener);
    }

    /**
     * 指定したイベントをディスパッチ(発生させた)する
     * @param {string} type イベント名
     */
    emit(type){
        // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
        const listenerSet = this._listners.get(type);
        // 登録なければ、何もしない
        if(!listenerSet){
            return;
        }
        // 全てのリスナー関数を呼び出す
        listenerSet.forEach(listener => {
            listener.call(this);            
        });
    }

    /**
     * 指定したイベントのイベントリスナーを解除する
     * @param {string} type イベント名
     * @param {Function} listener イベントリスナー
     */
    removeEventListener(type, listener){
        // 指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
        const listenerSet = this._listners.get(type);
        // 登録なければ、何もしない
        if(!listenerSet){
            return;
        }
        listenerSet.forEach(ownListener => {
            if (ownListener === listener){
                listenerSet.delete(listener)
            }
        });
    } 
}