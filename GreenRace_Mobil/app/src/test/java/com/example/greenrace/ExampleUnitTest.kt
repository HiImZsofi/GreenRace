package com.example.greenrace

import androidx.core.app.Person
import com.fasterxml.jackson.databind.JsonMappingException
import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.Assert.*
import org.junit.Test
import java.io.IOException

/**
 * Example local unit test, which will execute on the development machine (host).
 *
 * See [testing documentation](http://d.android.com/tools/testing).
 */
class ExampleUnitTest {
    @Test
    /*fun addition_isCorrect() {
        assertEquals(4, 2 + 2)
    }*/

    @Throws(IOException::class)
    fun givenJsonObject_whenDeserializingIntoString_thenException() {
        val json =
            "{\"username\":\"Azhrioun\",\"email\":\"Abderrahim@gmail.com\",\"password\":\"yxcasd\"}}"
        val mapper = ObjectMapper()
        val exception: Exception = assertThrows(JsonMappingException::class.java) {
            mapper.reader()
                .forType(Person::class.java)
                .readValue(json)
        }
        exception.message?.contains("Cannot construct instance of `com.example.greenrace.ResponseModel` (although at least one Creator exists): cannot deserialize from Object value (no delegate- or property-based Creator)")
        }
    }

