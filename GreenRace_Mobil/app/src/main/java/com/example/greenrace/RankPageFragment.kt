package com.example.greenrace

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ImageView
import android.widget.ListView
import android.widget.TextView
import com.example.greenrace.sharedPreferences.TokenUtils
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RankPageFragment : Fragment() {
    private lateinit var rankList: ListView
    private lateinit var rankItemList: List<RankItem>

    private lateinit var mContext: Context
    override fun onAttach(context: Context) {
        super.onAttach(context)
        mContext = context
    }
    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_rank_page, container, false)
    }
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        rankList = view.findViewById(R.id.rankListView)
        getData()
    }
    private fun getData() {
        val response = ServiceBuilder.buildService(ApiInterface::class.java)
        val tokenUtils = TokenUtils(requireContext())
        val token = tokenUtils.getAccessToken()
        val requestUserData = "Bearer $token"

        response.getRankData(requestUserData).enqueue(
            object : Callback<ResponseModelRankList> {
                override fun onResponse(
                    call: Call<ResponseModelRankList>,
                    response: Response<ResponseModelRankList>
                ) {
                    rankItemList = response.body()?.rankpagedata!!
                    setRankListAdapter()
                }

                override fun onFailure(call: Call<ResponseModelRankList>, t: Throwable) {
                    Log.i("Error", t.toString())
                }
            }
        )
    }

    private fun setRankListAdapter() {
        val adapter = object : ArrayAdapter<RankItem>(requireContext(),R.layout.ranklist_item,rankItemList){
            override fun getView(postion: Int,convertView: View?, parent: ViewGroup):View{
                val view = convertView ?: LayoutInflater.from(context).inflate(R.layout.ranklist_item, parent, false)
                val item = getItem(postion)

                val packageName = "com.example.greenrace"
                if (item?.picfilepath != null) {
                    val drawableResId = resources.getIdentifier(item?.picfilepath?.split(".")?.get(0), "drawable", packageName)
                    view.findViewById<ImageView>(R.id.rank_profpic).setImageResource(drawableResId)
                } else {
                    view.findViewById<ImageView>(R.id.rank_profpic).setImageResource(R.drawable.npic)
                }
                view.findViewById<TextView>(R.id.rank_username).text = item?.username
                view.findViewById<TextView>(R.id.rank_points).text = (item?.points.toString() + "p")

                return view
            }
        }
        rankList.adapter = adapter
    }
}