### Android Study

#### ViewModel

UI 데이터를 저장하고 관리

데이터가 단순한 경우 활동은 `onSaveInstanceState()` 메서드를 사용하여 `onCreate()`의 번들에서 데이터를 복원 가능

그러나 소량의 데이터만 적합, 비동기 호출을 자주 해야함.



MyViewModel.kt

~~~kotlin
 class MyViewModel : ViewModel() {
   private val users: MutableLiveData<List<User>> by lazy {
     MutableLiveData().also {
       loadUsers() //사용자 정보 가져오기
     }
   }

   fun getUsers(): LiveData<List<User>> {
     return users
   }

   private fun loadUsers() {
     //비동기 작업을 수행하여 사용자 정보를 가져옵니다.
   }
 }
~~~



MyActivity.kt

~~~kotlin
 class MyActivity : AppCompatActivity() {

        override fun onCreate(savedInstanceState: Bundle?) {
						
            // 재 작성된 활동은 첫 번째 활동에서 작성된 동일한 MyViewModel 인스턴스를 받습니다.
            // 시스템이 처음으로 활동의 onCreate () 메소드를 호출 할 때 ViewModel을 작성하십시오.
          	val model = ViewModelProviders.of(this)[MyViewModel::class.java]        
            model.getUsers().observe(this, Observer<List<User>>{ users ->
                // update UI
            })
        }
    }
~~~



#### 프래그먼트 간 데이터 공유

ViewModel 사용

~~~kotlin
    //공통으로 사용할 ViewModel 클래스 선언
		class SharedViewModel : ViewModel() {
        val selected = MutableLiveData<Item>()

        fun select(item: Item) {
            selected.value = item
        }
    }

		//프래그먼트 클래스 선언
    class MasterFragment : Fragment() {

        private lateinit var itemSelector: Selector

        private lateinit var model: SharedViewModel

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            model = activity?.run {
                ViewModelProviders.of(this)[SharedViewModel::class.java]
            } ?: throw Exception("Invalid Activity")
            itemSelector.setOnClickListener { item ->
                // Update the UI
            }
        }
    }

		//프래그먼트 클래스 선언
    class DetailFragment : Fragment() {

        private lateinit var model: SharedViewModel

        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            model = activity?.run {
                ViewModelProviders.of(this)[SharedViewModel::class.java]
            } ?: throw Exception("Invalid Activity")
            model.selected.observe(this, Observer<Item> { item ->
                // Update the UI
            })
        }
~~~



#### Repository Patten

ViewModel이 Activity나 Fragment에 보여주려고 하는 데이터를 Repository에 요청하면 Repository가 데이터를 받아서 보내줌.