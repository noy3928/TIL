queue = []
while True : 
    select = int(input('1: 삽입, 2: 삭제, 3:종료'))
    if select==1 :
        data=int(input('삽입할 데이터 : '))
        queue.append(data)
        print(queue)
    elif select==2:
        if len(queue)==0:
            print('큐가 비었습니다.')
        else:
            data=queue.pop(0)
            print('삭제된 데이터:', data)
            print(queue)
    else:
        break