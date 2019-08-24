require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    # 特定の条件でテストをグループ分けしたい場合、contextを使う
    context 'can save' do
      # この中にメッセージを保存できる場合のテストを記述
      # buildメソッドは、カラム名: 値の形で引数を渡すことによって、ファクトリーで定義されたデフォルトの値を上書きすることができる
      it 'is valid with content' do
        expect(build(:message, image: nil)).to be_valid
      end

      it 'is valid with image' do
        expect(build(:message, content: nil)).to be_valid
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    # 特定の条件でテストをグループ分けしたい場合、contextを使う
    context 'can not save' do
      # valid?メソッド: バリデーションにより保存ができない状態であるか、を確認できる
      # errorsメソッド: valid?メソッドを利用したインスタンス対して、なぜできないのかを確認することができる
      it 'is invalid without content and image' do
        message = build(:message, content: nil, image: nil)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it 'is invalid without group_id' do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invaid without user_id' do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end